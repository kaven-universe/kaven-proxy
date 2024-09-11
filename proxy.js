/********************************************************************
 * @author:      Kaven
 * @email:       kaven@wuwenkai.com
 * @website:     http://blog.kaven.xyz
 * @file:        [kaven-proxy] /proxy.js
 * @create:      2022-04-24 10:44:43.889
 * @modify:      2024-09-11 13:31:32.681
 * @version:     
 * @times:       14
 * @lines:       23
 * @copyright:   Copyright © 2022-2024 Kaven. All Rights Reserved.
 * @description: [description]
 * @license:     [license]
 ********************************************************************/

 const args = process.argv.slice(2);
 const { StartProxy } = require("kaven-utils");
 
 StartProxy(args[0] || __dirname).catch(err => {
    console.error(err);
    process.exit(1);
 });
