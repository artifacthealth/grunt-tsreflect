/// <reference path="../lib/node.d.ts"/>
/// <reference path="../lib/mocha.d.ts"/>
/// <reference path="../lib/chai.d.ts"/>
/// <reference path="../lib/gruntjs.d.ts"/>
/// <reference path="../lib/rimraf.d.ts"/>

import fs = require("fs");
import path = require("path");
import chai = require("chai");
import expect = chai.expect;
import childProcess = require("child_process");
import rimraf = require("rimraf");
import util = require("util");

var testCasesDir = "tests/cases/";
var fixturesDir = "tests/fixtures/";
var referenceBaselineDir = "tests/baselines/reference/";
var localBaselineDir = "tests/baselines/local/";


function setupCases(): void {

    // setup cases
    var files = fs.readdirSync(testCasesDir);
    for (var i = 0, l = files.length; i < l; i++) {

        var filename = files[i];
        // filter out anything but *.json
        if(/\.json/.test(filename)) {
            setupCase(filename);
        }
    }
}

function setupCase(filename: string): void {

    var baseName = path.basename(filename, ".json");

    describe('Case ' + filename, () => {

        before(() => {

        });

        it('should have correct output in ' + localBaselineDir + baseName, (done) => {

            // clean up output directory
            rimraf(localBaselineDir + baseName, (err: Error) => {
                if(err) return done(err);

                // then run test
                run(baseName, (err) => {
                    if(err) return done(err);

                    // compare to baseline
                    compareToBaseline(baseName);

                    done();
                });
            })
        });

        after(() => {
            // clean up
        });
    });
}

function run(name: string, cb: (err: Error) => void): void {

    childProcess.exec("grunt --case=" + name, { cwd: fixturesDir }, (err: Error, stdout: Buffer) => {

        var output = stdout.toString('utf8');

        if(err || output.indexOf("Completed without errors") == -1) {
            cb(new Error("Executing case " + name + "\n" + output));
            return;
        }

        cb(null);
    });
}

function compareToBaseline(name: string): void {

    var referenceDir = referenceBaselineDir + name + "/";
    var referenceFiles = fs.readdirSync(referenceDir);
    var localDir = localBaselineDir + name + "/";
    var localFiles = fs.readdirSync(localDir);

    // See if the directory contains the same files
    expect(localFiles, "Local directory is different from reference directory.").to.deep.equal(referenceFiles);

    // Compare the files
    for (var i = 0, l = referenceFiles.length; i < l; i++) {

        var filename = referenceFiles[i];
        // filter out anything but *.json
        if(/\.json/.test(filename)) {

            expect(readFile(localDir + filename), "File " + filename + " has changed.")
                .to.deep.equal(readFile(referenceDir + filename));
        }
    }
}

function readFile(filePath: string): any {

    var isJsonFile = path.extname(filePath) == ".json";

    if(!fs.existsSync(filePath)) {
        return isJsonFile ? {} : "";
    }

    var text = fs.readFileSync(filePath, "utf8");
    return isJsonFile ? JSON.parse(text) : text;
}

setupCases();