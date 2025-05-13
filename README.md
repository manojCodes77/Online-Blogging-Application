<img src="https://r2cdn.perplexity.ai/pplx-full-logo-primary-dark%402x.png" class="logo" width="120"/>

# React Native with NativeWind Template

This is a custom React Native template project with NativeWind integration, providing you with a streamlined starting point for building beautifully styled React Native applications using Tailwind CSS utility classes.

## What's Included

This template comes pre-configured with:

- **React Native (Expo)**: A framework for building native apps using React
- **NativeWind v2**: Tailwind CSS framework for React Native
- **Babel Configuration**: Properly set up to support NativeWind
- **Example Components**: Demonstrating NativeWind usage


## Getting Started

### Prerequisites

- Node.js (LTS version recommended)
- npm or Yarn
- Expo Go app (for testing on physical devices)


### Installation

1. Clone this repository:
```
git clone https://github.com/codermanoj2023/06-connecting-react-native-with-native-wind.git
cd 06-connecting-react-native-with-native-wind
```

2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npx expo start
```

In the output, you'll find options to open the app in:

- Android emulator
- iOS simulator
- Expo Go (scan the QR code with your device)


## NativeWind Setup (Already Configured)

This template already has NativeWind properly configured with:

- NativeWind v2 and TailwindCSS 3.3.2 installed
- Tailwind configuration in `tailwind.config.js`
- Babel plugin added to `babel.config.js`
- Required imports in the main component files


### Important Version Notes

This template uses:

- `nativewind@^2.0.0`
- `tailwindcss@3.3.2` (NativeWind v2 doesn't work with TailwindCSS >3.3.2)[^2]


## Using NativeWind in This Template

NativeWind allows you to use Tailwind CSS classes directly in your React Native components:

```jsx
import { View, Text } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 items-center justify-center bg-white p-4">
      <Text className="text-xl font-bold text-blue-500">Hello NativeWind!</Text>
    </View>
  );
}
```


### Key Features

- Write Tailwind classes with the `className` prop (works thanks to NativeWind's Babel plugin)
- Style your components with concise, utility-first CSS classes
- Maintain a consistent design language across your app
- Utilize responsive design with NativeWind's mobile-first approach


## Project Structure

This project uses file-based routing with files inside the **app** directory. You can start developing by editing these files.

## Customizing Tailwind

If you want to customize your Tailwind configuration:

1. Modify the `tailwind.config.js` file to add custom colors, spacing, etc.
2. Make sure any new component directories are included in the `content` array:
```js
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Your customizations here
    },
  },
  plugins: [],
};
```


## Troubleshooting

### Common Issues:

- **Styles not applying**: Make sure to restart the development server after making changes to the Babel config
- **"Unable to resolve module 'nativewind'"**: Check that you've installed all dependencies correctly
- **React Native Web issues**: For web support, you may need additional configuration


## Learn More

- [NativeWind Documentation](https://www.nativewind.dev/docs/getting-started/installation)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/docs/getting-started)


## Community

Join our community of developers creating universal apps:

- [Expo on GitHub](https://github.com/expo/expo)
- [Expo Discord Community](https://chat.expo.dev/)
- [NativeWind GitHub](https://github.com/marklawlor/nativewind)


## License

This project is MIT licensed.

Happy coding! 🚀

<div style="text-align: center">⁂</div>

[^1]: https://github.com/codermanoj2023/06-connecting-react-native-with-native-wind

[^2]: https://github.com/codermanoj2023/06-connecting-react-native-with-native-wind

[^3]: https://nativewind.dev/v2/quick-starts/expo

[^4]: https://blog.logrocket.com/getting-started-nativewind-tailwind-react-native/

[^5]: https://docs.expo.dev/versions/latest/config/babel/

[^6]: https://www.nativewind.dev/v2/guides/tailwindcss-react-native

[^7]: https://github.com/kimchouard/expo-nativewind-storybook-template/blob/main/README.md

[^8]: https://github.com/therealadum/nativewind

[^9]: https://unpkg.com/browse/tailwind-react-native-classnames@1.5.1/readme.md

[^10]: https://www.nativewind.dev/docs/getting-started/installation

[^11]: https://github.com/mrwyndham/expo-nativewind-template/blob/main/README.md

[^12]: https://stackoverflow.com/questions/78535645/after-setup-nativewind-does-not-work-with-expo

[^13]: https://www.nativewind.dev/v2/getting-started/installation

[^14]: https://www.nativewind.dev/docs/getting-started/installation/frameworkless

[^15]: https://dev.to/syketb/how-to-add-nativewind-in-react-native-expo-3h55

[^16]: https://github.com/designly1/react-native-tailwind-example/blob/master/README.md

[^17]: https://nativewindui.com/installation/manual

[^18]: https://dev.to/gamertense/getting-started-with-nativewind-using-tailwind-css-in-react-native-13e6

[^19]: https://nativewind.dev/v2/guides/babel

[^20]: https://github.com/nativewind/nativewind/issues/1045

[^21]: https://docs.expo.dev/guides/tailwind/

[^22]: https://www.youtube.com/watch?v=WcumWxicmao

[^23]: https://www.npmjs.com/package/nativewind

[^24]: https://www.nativewind.dev/v2/guides/babel-compile-only

[^25]: https://nativewind.dev/customization/configuration

[^26]: https://dev.to/shahbaazx786/setting-up-react-native-expo-tailwind-gluestack-ui-v2-430e

[^27]: https://www.youtube.com/watch?v=FyCaPXpvyNM

[^28]: https://github.com/MasFana/Nativewind-Starter

[^29]: https://echobind.com/post/native-wind-universal-styling-expo

[^30]: https://github.com/nativewind/nativewind

[^31]: https://www.youtube.com/watch?v=_Z33DTn0ZFo

[^32]: https://www.youtube.com/watch?v=RsFoOlYj-gc

[^33]: https://github.com/nativewind/nativewind-pure

[^34]: https://github.com/TVke/react-native-tailwindcss/blob/master/README.md

[^35]: https://docs.expo.dev/more/create-expo

[^36]: https://github.com/marklawlor/nativewind/issues/470

[^37]: https://kombai.com/tailwind/tailwind-react-native-installation-and-usage/

[^38]: https://github.com/gluestack/ui-example-nativewind

