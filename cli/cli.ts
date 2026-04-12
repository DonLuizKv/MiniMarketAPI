#!/usr/bin/env node
import { Command } from "commander";
import { makeModule } from "./commands/make-module";
import { makeDomain } from "./commands/make-domain";

const program = new Command();

program
  .command("make:module <name>")
  .description("Create a new module")
  .action(makeModule);

program
  .command("make:domain <name>")
  .description("Create a new domain")
  .action(makeDomain);

program.parse(process.argv);

