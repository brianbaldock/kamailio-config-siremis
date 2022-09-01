const childProcess = require("child_process");
const fs = require("fs");

function execute(command) {
    return new Promise(function (resolve, reject) {
        childProcess.exec(command, function (error, standardOutput, standardError) {
            if (error) {
                reject();
                return;
            }

            if (standardError) {
                reject(standardError);
                return;
            }

            resolve(standardOutput);
        });
    });
}

async function main() {
    const jsonFile = fs.readFileSync("/etc/kamailio/settings/help.json", "utf8");
    const jsonData = JSON.parse(jsonFile);

    let idc = 0;
    let ip = process.argv[2];
    if (ip == null) return console.log(false);

    let ip_slice_idx = ip.indexOf("@");
    ip = ip.slice(ip_slice_idx + 1);
    ip = jsonData[ip];

    let r = await execute("kamcmd dispatcher.list");
    let split = r.split("SET:");

    let rr = split.some((val, idx) => {
        val = val.trim();
        if (val.includes(`${ip}`)) {
            let id = val[val.indexOf(`ID:`) + 4];
            let find_addr = val.indexOf(`${ip}`);
            let find_flag = val.indexOf("FLAGS: AP", find_addr);

            if (typeof id !== "number" && find_addr > 0 && find_flag > 0 && find_flag > 0) {
                idc = id;
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });

    if (rr == true) {
        console.log(idc);
    } else {
        console.log(false);
    }
}

main();
