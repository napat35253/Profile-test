/**
 * HTML Validation Script
 * Validates the structure and content of index.html
 */

const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, '..', 'index.html');

function validate() {
  let errors = 0;

  // Check file exists
  if (!fs.existsSync(htmlPath)) {
    console.error('FAIL: index.html does not exist');
    process.exit(1);
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Required elements
  const checks = [
    { name: 'DOCTYPE', pattern: /<!DOCTYPE html>/i },
    { name: 'html lang attribute', pattern: /<html[^>]+lang="[^"]+"/i },
    { name: 'meta charset', pattern: /<meta[^>]+charset="UTF-8"/i },
    { name: 'meta viewport', pattern: /<meta[^>]+viewport/i },
    { name: 'title element', pattern: /<title>.+<\/title>/i },
    { name: 'nav element', pattern: /<nav[^>]*>/i },
    { name: 'hero section', pattern: /id="hero"/i },
    { name: 'about section', pattern: /id="about"/i },
    { name: 'skills section', pattern: /id="skills"/i },
    { name: 'experience section', pattern: /id="experience"/i },
    { name: 'awards section', pattern: /id="awards"/i },
    { name: 'contact section', pattern: /id="contact"/i },
    { name: 'CSS stylesheet link', pattern: /<link[^>]+stylesheet[^>]+style\.css/i },
    { name: 'JS script tag', pattern: /<script[^>]+main\.js/i },
    { name: 'footer element', pattern: /<footer/i },
    { name: 'aria-label attributes', pattern: /aria-label/i },
  ];

  for (const check of checks) {
    if (check.pattern.test(html)) {
      console.log(`PASS: ${check.name}`);
    } else {
      console.error(`FAIL: Missing ${check.name}`);
      errors++;
    }
  }

  if (errors > 0) {
    console.error(`\n${errors} validation error(s) found.`);
    process.exit(1);
  } else {
    console.log(`\nAll ${checks.length} checks passed.`);
    process.exit(0);
  }
}

validate();
