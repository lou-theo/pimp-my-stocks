/**
 * This file is used to create public-api.ts which is required for exporting all the files of the library
 */

const path = require('path');
const fs = require('fs');
const { readdir } = require('fs').promises;

async function getFiles(dir) {
    const results = await readdir(dir, { withFileTypes: true });

    const files = await Promise.all(
        results
            .filter((f) => f.isDirectory() || (f.name.match(/\.ts$/) && !f.name.match(/\.spec\.ts$/)))
            .map((f) => {
                const res = dir + '/' + f.name;
                if (f.isDirectory()) {
                    return getFiles(res);
                } else if (dir.match(/^\.\/lib/)) {
                    return res;
                }
                return [];
            }),
    );

    return files.flat();
}

(async function () {
    const files = await getFiles('.');

    const output = fs.createWriteStream(path.join('./', 'index.ts'));
    for (const file of files) {
        output.write(`export * from '${file.replace('.ts', '')}';\n`);
    }

    output.close();
})();
