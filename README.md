jquery.magiccolumns
===================

jQuery Plugin to dynamically show/hide table contents to fit window.

Consider this a Beta at best; it works for the single use case that I needed it for, but might not work in all cases.  It also needs some prettying up.

Call on the root `<table>` element; will simply exit if called against other tags.

`<th>` and `<td>` cells that you want to dynamically hide need a `data-priority` attribute.  A `data-priority` of 0 is a permanent cell and will never be hidden.  Lower numbers persist longer; a cell with `data-priority=10` will be hidden long before one with `data-priority=1`.

Use at your own risk.
