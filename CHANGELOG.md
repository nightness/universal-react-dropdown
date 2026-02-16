# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.0] - 2026-02-16

### Added
- Viewport-aware auto-flip: dropdown automatically flips direction when near viewport edges
- Full keyboard navigation (Tab, Enter, Space, Escape, Arrow keys, PageUp/PageDown, Home/End)
- CSS variable support for theming
- DemoPage component for interactive dropdown demonstration

### Fixed
- SVG arrow rotation bug
- Stale closure issues in event handlers
- Duplicate useEffect cleanup

### Changed
- Scoped inline styles for better encapsulation
- Major code refactoring and cleanup
- Moved `react` and `react-dom` to peerDependencies

## [0.4.2] - 2024-07-15

### Fixed
- CSS files were not being included in the distributed package

## [0.4.0] - 2024-07-14

### Changed
- Major refactoring to clean up the codebase
- Added example project / development environment

### Fixed
- Bug in ensureVisibility function

## [0.3.0] - 2024-06-20

### Added
- ensureVisibility: scrolls the selected item into view when the dropdown is reopened
