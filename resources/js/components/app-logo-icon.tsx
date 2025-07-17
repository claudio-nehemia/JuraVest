import { ImgHTMLAttributes } from 'react';

interface AppLogoIconProps extends ImgHTMLAttributes<HTMLImageElement> {
    size?: 'small' | 'medium' | 'large' | 'custom';
    width?: string;
}

export default function AppLogoIcon({ size = 'medium', width, ...props }: AppLogoIconProps) {
    // Tentukan ukuran berdasarkan prop size
    const getWidth = () => {
        if (width) return width; // Jika width custom diberikan
        
        switch (size) {
            case 'small':
                return '80px';
            case 'medium':
                return '120px';
            case 'large':
                return '200px';
            case 'custom':
                return props.style?.width || '150px';
            default:
                return '120px';
        }
    };

    return (
        <img
            {...props}
            src="/jura-logo.png"
            alt="Montana Machine Logo"
            style={{
                width: getWidth(),
                height: 'auto',
                display: 'block',
                background: 'white',
                margin: '0',
                padding: '0',
                objectFit: 'contain', // Menjaga proporsi gambar
                ...props.style, // Memungkinkan override style dari props
            }}
        />
    );
}