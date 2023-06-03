# Classy UI

Classy UI is a pure (vanilla) Javascript UI kit. It is a set of JS classes used to make common UI elements. It utilizes Tailwind CSS for styling.

## Advantage Over Typical Tailwind Components

Most Tailwind components are provided as either HTML templates with predefined markup, or React/Vue components. While the versions for React and Vue are partially dynamic, they still tend to require substantial work to utilize in a project. ClassyUI focuses on dynamic data first, realizing that you probably already have data and other markup and need the UI to render it.

## Icon Integration

We have 2 free icon set integrations. Font Awesome free icons and Hero Icons from Tailwind are both fully integrated for use in the ClassyUI kit. In addition we have plans for integration of FontAwesome's JS API which will allow users with an FA Pro license to use the pro versions of FontAwesome icons in their ClassyUI projects. FA Pro license holders can already use the FA pro icons by manually downloading the SVG code from their account or loading an FA kit, and then passing the icon code anywhere an icon is defined in ClassyUI components.

## Top Down Control

Parent components have control over their children. Children are stored in a children object and referenced by names such as IconLogo will have an icon child component. To change the icon settings the component can be referenced with this.children.icon.
