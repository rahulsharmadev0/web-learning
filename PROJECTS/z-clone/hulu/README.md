
## Styling approach
### 1) Design tokens with CSS variables
Defined in `:root` for theme-wide consistency.

### 2) Base reset and typography
- Global reset via `* { margin: 0; padding: 0; box-sizing: border-box; }`
- System font stack in `body` for performance; smoothing enabled; dark background; primary text color.

### 3) Utilities (single‑purpose helpers)
- `.viewport` , `.btn`: 
```.viewport {
  max-width: 1280px;
  margin: 0 auto;
}

.btn {
  display: inline-block;
  background-color: var(--hulu-green);
  color: var(--hulu-gray);
  width: fit-content;
  height: 56px;
  padding: 0 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s ease;
}
```
- `.sTxt`, `.nTxt`: small typography helpers for quick font-size tweaks.
```
.sTxt {
  font-size: 12px;
}

.nTxt{
  font-size: 14px;
}
```
- `.section` , `.icon`
```
.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 56px 0;
}

.icon{
    width: 28px
    height: 28px
}
```

