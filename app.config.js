import "dotenv/config"

export default {
    expo: {
        name: "mobile-neurahive",
        slug: "mobile-neurahive",
        version: "1.0.0",
        orientation: "portrait",
        icon: "./src/assets/images/neurahive-icon-1024x1024.png",
        splash: {
            image: "./src/assets/images/neurahive-icon.png",
            resizeMode: "contain",
            backgroundColor: "#ffffff",
        },
        scheme: "myapp",
        userInterfaceStyle: "automatic",
        newArchEnabled: true,
        ios: {
            supportsTablet: true,
        },
        android: {
            permissions: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"],
            adaptiveIcon: {
                backgroundColor: "#ffffff",
            },
            package: "com.syntax_squad.neurahive",
        },
        web: {
            bundler: "metro",
            output: "static",
            favicon: "./assets/images/favicon.png",
        },
        plugins: [
            "expo-router",
            [
                "expo-splash-screen",
                {
                    image: "./src/assets/images/neurahive-icon.png",
                    imageWidth: 200,
                    resizeMode: "contain",
                    backgroundColor: "#FCAF1F",
                },
            ],
            "expo-secure-store",
        ],
        experiments: {
            typedRoutes: true,
        },
        extra: {
            router: {
                origin: false,
            },
            eas: {
                projectId: "02cad5d7-6435-4831-90ed-158b984ddda7",
            },

            API_URL: process.env.EXPO_PUBLIC_API_URL,
            WEBSOCKET_URL: process.env.EXPO_PUBLIC_WEBSOCKET_URL,
        },
    },
}
