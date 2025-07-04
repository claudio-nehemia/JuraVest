import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide} from 'swiper/react';

const slides = [
    {
        image: '1.png',
        icon: 'icon icon-Settings',
        heading: 'Juravest',
        title: 'Welcome To',
        highlight: 'Juravest!',
        description:
            'Juravest adalah tempat di mana para investor bertemu dengan wirausahawan penuh visi. Bangun koneksi, temukan peluang, dan wujudkan ide besar bersama komunitas yang saling mendukung.',
    },
    {
        image: '2.png',
        heading: 'Juravest',
        title: 'Jelajahi',
        highlight: 'Peluang Usaha!',
        description:
            'Temukan startup dan usaha potensial dari berbagai bidang industri. Dengan Juravest, kamu bisa berinvestasi secara cerdas dan membangun relasi jangka panjang.',
        actions: [{ label: 'Mulai Investasi!', href: '/wirausaha', type: 'white'}]
    },
    {
        image: '3.png',
        heading: 'Juravest',
        title: 'Temukan Investor',
        highlight: 'Yang Tepat!',
        description:
            'Bangun jaringan profesional dan dapatkan dukungan modal dari investor yang percaya pada ide dan bisnismu. Juravest membuka jalan menuju kolaborasi yang saling menguntungkan.',
        actions: [{ label: 'Cari Investor!', href: '/investors', type: 'white'}]
    }
]

export default function HeroSlidder() {
    return (
        <div className="relative w-full">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 2500, disableOnInteraction: false }}
                navigation
                pagination={{ clickable: true }}
                loop
                className="w-full"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative flex h-[60vh] items-center justify-center text-white sm:h-[70vh] md:h-[80vh]">
                            <img src={slide.image} alt="Background" className="absolute inset-0 -z-10 h-full w-full object-cover" />
                            <div className="container mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
                                <div className="space-y-4">
                                    {slide.icon && (
                                        <div className="text-3xl sm:text-4xl">
                                            <i className={slide.icon}></i>
                                        </div>
                                    )}
                                    <div className="text-base font-semibold tracking-wide uppercase sm:text-lg">{slide.heading}</div>
                                    <div className="text-2xl font-bold sm:text-3xl text-yellow-600 md:text-5xl">
                                        {slide.title} {slide.highlight && <span className="text-yellow-400">{slide.highlight}</span>}
                                    </div> 
                                    <div className="pl-6 pr-6 text-2xl font-bold text-amber-600 sm:text-base md:text-xl">{slide.description}</div>
                                    {slide.actions && (
                                        <div className="mt-6 flex flex-wrap justify-center gap-4">
                                            {slide.actions.map((action, idx) => (
                                                <a
                                                    key={idx}
                                                    href={action.href}
                                                    className={`rounded-md px-4 py-2 font-medium transition sm:px-6 sm:py-3 ${
                                                        action.type === 'white'
                                                            ? 'bg-white text-black hover:bg-gray-200'
                                                            : 'bg-yellow-500 text-white hover:bg-yellow-600'
                                                    }`}
                                                >
                                                    {action.label}
                                                </a>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}