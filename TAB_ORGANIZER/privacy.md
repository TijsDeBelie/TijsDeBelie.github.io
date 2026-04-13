## Tab Organizer Privacy Policy

Effective date: 12/04/2026

Tab Organizer is a Chrome extension that automatically groups browser tabs based on user-defined URL matching rules.

### What data the extension processes

- Tab URL values (for rule matching only).
- Rule settings you create (pattern, group name, group color, and per-rule enabled state).
- UI and behavior preferences (theme, auto-grouping enabled state, startup grouping, case-sensitive matching, smart URL suggestion preference, popup font size, and section open/closed state).
- Optional local import/export files you choose to create or select (rules and supported settings data in JSON format).

### How data is used

- URL values are processed locally on your device to determine whether a tab should be grouped.
- When Smart URL Suggestions is enabled, tab URLs from the current window are processed locally to suggest domain-based pattern values in the Add Rule form.
- When Apply Now is used, currently open tabs are processed locally so rules can be applied on demand.
- Rules and preferences are stored using Chrome `storage.sync` so your settings can be available on Chrome profiles signed into your Google account.
- Import/export files are handled locally in your browser session and are only written/read when you explicitly use those actions.
- The extension does not read page content, form data, passwords, cookies, browsing history databases, or personal account data.

### What data is not collected or shared

- No analytics, tracking pixels, advertising, or telemetry.
- No data is sold.
- No tab content is transmitted to external servers.
- No remote code is downloaded or executed.
- Privacy Policy and Changelog viewer pages render local extension documents only.

### Permissions rationale

- `tabs`: needed to read tab URLs for matching rules, provide local Smart URL Suggestions, and apply rules to existing tabs.
- `tabGroups`: needed to create, update, and manage Chrome tab groups.
- `storage`: needed to save your rules and extension preferences.

### Data retention and control

- Rules and preferences remain in Chrome sync storage until you edit/remove them or uninstall the extension.
- You can disable automatic grouping at any time from the extension popup.
- You can disable startup grouping, case-sensitive matching, and smart URL suggestions at any time from Settings.
- You can delete all extension data by removing rules or uninstalling the extension.
- You can delete exported files manually from your device at any time.

### Chrome Web Store data-use declaration

- This extension does not sell or transfer user data to third parties.
- This extension does not use user data for advertising or creditworthiness decisions.
- Data use is limited to the user-facing functionality of grouping tabs by user-defined rules.

### Contact

Publisher: Tab Organizer

Support: Contact is currently provided through the Chrome Web Store support channel listed on the extension page.

