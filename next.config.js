/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'mf7w9ltgtkquvu74.public.blob.vercel-storage.com',
                port: "",
                pathname: "/**"
            }
        ]
    }
};

export default nextConfig;
