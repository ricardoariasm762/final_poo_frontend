---
name: Gestión Profesional
colors:
  surface: '#fbf8fa'
  surface-dim: '#dcd9db'
  surface-bright: '#fbf8fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f4'
  surface-container: '#f0edef'
  surface-container-high: '#eae7e9'
  surface-container-highest: '#e4e2e3'
  on-surface: '#1b1b1d'
  on-surface-variant: '#45474c'
  inverse-surface: '#303032'
  inverse-on-surface: '#f3f0f2'
  outline: '#75777d'
  outline-variant: '#c5c6cd'
  surface-tint: '#545f73'
  primary: '#091426'
  on-primary: '#ffffff'
  primary-container: '#1e293b'
  on-primary-container: '#8590a6'
  inverse-primary: '#bcc7de'
  secondary: '#505f76'
  on-secondary: '#ffffff'
  secondary-container: '#d0e1fb'
  on-secondary-container: '#54647a'
  tertiary: '#1e1200'
  on-tertiary: '#ffffff'
  tertiary-container: '#35260c'
  on-tertiary-container: '#a38c6a'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d8e3fb'
  primary-fixed-dim: '#bcc7de'
  on-primary-fixed: '#111c2d'
  on-primary-fixed-variant: '#3c475a'
  secondary-fixed: '#d3e4fe'
  secondary-fixed-dim: '#b7c8e1'
  on-secondary-fixed: '#0b1c30'
  on-secondary-fixed-variant: '#38485d'
  tertiary-fixed: '#fadfb8'
  tertiary-fixed-dim: '#ddc39d'
  on-tertiary-fixed: '#271902'
  on-tertiary-fixed-variant: '#564427'
  background: '#fbf8fa'
  on-background: '#1b1b1d'
  surface-variant: '#e4e2e3'
typography:
  h1:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  h2:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  h3:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: '0'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.05em
  button:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  container-margin: 32px
  gutter: 24px
---

## Brand & Style

The design system is anchored in a **Corporate Modern** aesthetic, specifically tailored for the high-stakes environment of order management. The brand personality is efficient, reliable, and transparent. It prioritizes clarity of data over decorative elements, ensuring that administrators can process high volumes of information without cognitive fatigue.

The style utilizes a **Minimalist Card-based** approach. By isolating data into distinct containers with ample whitespace, the UI creates a sense of order and hierarchy. The emotional response should be one of "controlled precision"—where every action feels intentional and every piece of data is easily locatable.

## Colors

The palette is designed for professional endurance. 
- **Deep Navy (#1e293b)** serves as the primary structural color, used for navigation, sidebars, and heavy headings to provide a sense of stability.
- **Clean Slate (#64748b)** is the workhorse for secondary information, metadata, and placeholder text, reducing visual noise.
- **Crisp Accent Blue (#3b82f6)** is reserved strictly for interactive elements (buttons, links, active states) to guide the user's eye to primary actions.
- The background uses a very light slate tint to allow white cards to pop with subtle contrast.

## Typography

This design system utilizes **Inter** for its exceptional readability in data-heavy environments. The typographic scale is optimized for a hierarchical display of "Estado de Pedido" (Order Status) and "Detalles del Cliente" (Customer Details). 

Headlines use a tighter letter-spacing and heavier weights to anchor the page sections. Body text maintains a standard tracking to ensure legibility during long periods of reading. Small labels use an uppercase treatment with increased tracking to distinguish metadata from actionable content.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. The primary sidebar remains fixed at 280px, while the main content area utilizes a 12-column fluid grid. 

The spacing philosophy is "Generous and Consistent," adhering to a 4px baseline grid. Internal card padding is strictly set to `lg` (24px) to prevent data from feeling cramped. Vertical rhythm between different cards or sections should consistently use `xl` (32px) to clearly define separate workflows.

## Elevation & Depth

Visual hierarchy in the design system is achieved through **Ambient Shadows** and surface layering. 

- **Level 0 (Background):** The base layer uses the background slate tint (#f8fafc).
- **Level 1 (Cards/Content):** Pure white surfaces (#ffffff) with a soft, diffused shadow (Offset: 0 4px, Blur: 6px, Color: rgba(30, 41, 59, 0.05)).
- **Level 2 (Overlays/Dropdowns):** Elevated surfaces with a more pronounced shadow (Offset: 0 10px, Blur: 15px, Color: rgba(30, 41, 59, 0.1)) to indicate temporary interaction.

Avoid using heavy borders; use subtle 1px outlines in a light slate gray only when cards are placed on white backgrounds.

## Shapes

The shape language is defined as **Rounded**, striking a balance between modern friendliness and professional rigor. 

- **Standard Elements:** Buttons, inputs, and small widgets use a 0.5rem (8px) radius.
- **Containers:** Large cards and modal overlays use a 1rem (16px) radius to soften the overall appearance of the dashboard.
- **Icons:** Use a 2px stroke width with rounded caps to match the geometric character of the Inter typeface.

## Components

- **Buttons:** The primary action button (e.g., "Confirmar Pedido") uses the Accent Blue background with white text. Secondary actions use a ghost style with a slate border.
- **Inputs:** Text fields feature a subtle 1px border (#cbd5e1). Upon focus, the border transitions to Accent Blue with a soft 3px outer glow. Labels are always positioned above the field in `body-sm` weight.
- **Chips/Badges:** Used for order statuses (e.g., "Pendiente", "Enviado", "Cancelado"). Use low-saturation background tints of the status color with high-saturation text for readability.
- **Cards:** The primary container for all data. Every card must have a consistent header section with a title in `h3` and optional action icons on the right.
- **Data Tables:** Use a clean, borderless row style. Zebra striping is discouraged; use a subtle hover state highlight (#f1f5f9) to help users track rows.
- **Order Timeline:** A vertical stepper component to show the progression of an order, using the Primary Deep Navy for completed steps and Accent Blue for the current active state.