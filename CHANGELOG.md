# Changelog

All notable changes to this project will be documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/).

## [0.1.1] - 2025-10-04

### Added

- Command to remove extension mapping for a file type

## [0.1.0] - 2025-10-04

### Added

- Command to show the file where extension mappings are stored

## [0.0.3] - 2025-10-03

### Changed

- Enhanced error handling by adding console logging and window error messages

## [0.0.2] - 2025-10-03

### Changed

- Changed Extension name from `Smart Extension Manager` to `Extension Manager`

## [0.0.1] - 2025-10-02

### Added

- Initial project setup
- Core structure with `extension.ts`
- Command to scan workspace and recommend extensions
- Command to add custom file-type to extension mappings
- Automatic creation of `.vscode/extensions.json` with recommendations
- Incorrect path handling for `mappings.json`
