/*! *****************************************************************************
 Copyright (c) 2014 Artifact Health

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 ***************************************************************************** */

/// <reference path="../typings/tsreflect-compiler.d.ts" />
/// <reference path="../typings/gruntjs.d.ts" />
/// <reference path="../typings/node.d.ts" />

import compiler = require("tsreflect-compiler");
import fs = require("fs");
import path = require("path");

function task(grunt: IGrunt) {

    grunt.registerMultiTask('tsreflect', 'Grunt plugin to generate TypeScript JSON declaration files for runtime type information.', function() {

        var options = this.options({
        });

        var start = process.hrtime();

        var hasErrors = false;

        // Iterate over all specified file groups.
        this.files.forEach((file:  grunt.file.IFileMap) => {

            var diagnostics = compiler.compile(file.src, createCompilerOptions(file, options));
            for(var i = 0, l = diagnostics.length; i < l; i++) {

                reportDiagnostic(diagnostics[i]);
            }
        });

        if(!hasErrors) {
            var elapsed = process.hrtime(start);
            grunt.log.ok("Completed without errors in " + elapsed[0] + "s, " + (elapsed[1] / 1000000).toFixed(3) + "ms");
        }

        function reportDiagnostic(diagnostic: compiler.Diagnostic): void {
            var output = "";

            if(diagnostic.filename) {
                output += diagnostic.filename + "(" + diagnostic.line + "," + diagnostic.character + "): ";
            }

            var category = compiler.DiagnosticCategory[diagnostic.category].toLowerCase();
            output += category + " TS" + diagnostic.code + ": " + diagnostic.messageText + "\n";

            switch(diagnostic.category) {
                case compiler.DiagnosticCategory.Warning:
                    grunt.log.warn(output);
                    break;
                case compiler.DiagnosticCategory.Error:
                    grunt.log.error(output);
                    hasErrors = true;
                    break;
                case compiler.DiagnosticCategory.Message:
                    grunt.log.writeln(output);
                    break;
            }
        }
    });

    function createCompilerOptions(file: grunt.file.IFileMap, taskOptions: any): compiler.CompilerOptions {

        var ret: compiler.CompilerOptions = {};

        ret.noLib = !!taskOptions.noLib;
        ret.noCheck = !!taskOptions.noCheck;

        // set output file or output directory
        var dest = file.dest;
        if(isOutputFile(dest)) {
            ret.out = dest;
        }
        else {
            ret.outDir = dest;
        }

        ret.removeComments = !!taskOptions.removeComments;
        ret.noImplicitAny = !!taskOptions.noImplicitAny;

        ret.accessors = !!taskOptions.accessors;
        ret.annotations = !!taskOptions.annotations;
        ret.removePrivates = !!taskOptions.removePrivates;
        ret.typePrivates = !!taskOptions.typePrivates;

        return ret;
    }

    function isOutputFile(dest: string): boolean {

        return dest && path.extname(dest) == ".json";
    }
}

export = task;

