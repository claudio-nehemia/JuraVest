import Navbar from "@/components/navbar";
import UsahaBaruCard from "@/components/usaha-baru-card";
import { Wirausaha } from "@/types";
import { MessageCircle, MapPin, Users, Briefcase, TrendingUp } from "lucide-react";
import { Link } from "@inertiajs/react";
import { Star } from "lucide-react";
import { DollarSign, Calendar } from "lucide-react";
import UsahaOngoingCard from "@/components/usaha-ongoing-card";

interface WirausahaDetailProps {
    wirausaha: Wirausaha;
}
const WirausahaDetail: React.FC<WirausahaDetailProps> = ({ wirausaha }) => {
  const getLocationText = () => {
    if (wirausaha.tipe_usaha === "Usaha Baru") {
      return wirausaha.usaha_baru?.rencana_lokasi_operasional || 'Lokasi tidak tersedia';
    } else {
      return wirausaha.usaha_ongoing?.lokasi_operasional || 'Lokasi tidak tersedia';
    }
  };

  const getDescriptionText = () => {
    if (wirausaha.tipe_usaha === "Usaha Baru") {
      return wirausaha.usaha_baru?.latar_belakang || 'Deskripsi tidak tersedia';
    } else {
      return wirausaha.usaha_ongoing?.proyeksi_usaha || 'Deskripsi tidak tersedia';
    }
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word.charAt(0)).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br pb-4 from-orange-50 to-amber-50">
      <Navbar/>
      
      {/* Hero Image Section */}
      <div className="relative">
        {wirausaha.foto_profil ? (
          <img 
            src={`/storage/${wirausaha.foto_profil}`}
            alt={wirausaha.nama_usaha}
            className="w-full h-80 object-cover"
          />
        ) : (
          <div className="w-full h-80 bg-gradient-to-r from-orange-400 to-amber-500 flex items-center justify-center">
            <div className="text-8xl">🏪</div>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Badge */}
        <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full">
          <span className="text-sm font-semibold text-gray-800">
            {wirausaha.jenis_usaha?.jenis_usaha || 'Umum'}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 -mt-20 relative z-10">
        {/* Business Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              {/* Business Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full"></div>
                  <h1 className="text-3xl font-bold text-gray-800">{wirausaha.nama_usaha}</h1>
                  {wirausaha.tipe_usaha === "Usaha Baru" && (
                    <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2 py-1 rounded-full">
                      Usaha Baru
                    </span>
                  )}
                  {wirausaha.tipe_usaha === "Usaha Ongoing" && (
                    <span className="bg-green-100 text-green-800 text-sm font-medium px-2 py-1 rounded-full">
                      Usaha Berjalan
                    </span>
                  )}
                </div>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {getDescriptionText()}
                </p>
                
                {/* Location */}
                <div className="flex items-center gap-2 mb-6 text-gray-700">
                  <MapPin className="h-5 w-5 text-orange-500" />
                  <span className="font-medium">{getLocationText()}</span>
                </div>
                
                {/* Owner Info */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {getInitials(wirausaha.user?.name ?? "-")}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">{wirausaha.user?.name ?? "-"}</p>
                    <p className="text-sm text-gray-500">Pemilik Usaha</p>
                    <p className="text-sm text-gray-400">{wirausaha.user?.email ?? "-"}</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 md:w-48">
                <Link 
                  href={`/chat/${wirausaha.user?.id}`}
                  className="flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-orange-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  <MessageCircle size={20}/>
                  Chat Sekarang
                </Link>
                <Link 
                  href="/transaksi"
                  className="flex items-center justify-center gap-2 bg-white text-orange-600 px-6 py-3 rounded-xl font-semibold border-2 border-orange-500 hover:bg-orange-50 transition-all duration-300"
                >
                  <TrendingUp size={20}/>
                  Lihat Transaksi
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <Briefcase className="text-orange-600" size={20}/>
              </div>
              <h3 className="font-semibold text-gray-800">Jenis Usaha</h3>
            </div>
            <p className="text-gray-600 font-medium">{wirausaha.jenis_usaha?.jenis_usaha || 'Tidak tersedia'}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <Users className="text-amber-600" size={20}/>
              </div>
              <h3 className="font-semibold text-gray-800">Target Pasar</h3>
            </div>
            <p className="text-gray-600 font-medium">{wirausaha.target_pasar?.target_pasar || 'Tidak tersedia'}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="text-orange-600" size={20}/>
              </div>
              <h3 className="font-semibold text-gray-800">Tipe Usaha</h3>
            </div>
            <p className="text-gray-600 font-medium">
              {wirausaha.tipe_usaha === "Usaha Ongoing" ? "Usaha Berjalan" : "Usaha Baru"}
            </p>
          </div>
        </div>

        {/* Additional Details based on business type */}
        {wirausaha.tipe_usaha === "Usaha Baru" && wirausaha.usaha_baru && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Star className="text-blue-500" size={20} />
              Detail Usaha Baru
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {wirausaha.usaha_baru.perkiraan_dana && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                    <DollarSign className="text-green-600" size={16}/>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Perkiraan Modal</h4>
                    <p className="text-gray-600">{wirausaha.usaha_baru.perkiraan_dana}</p>
                  </div>
                </div>
              )}
              
              {wirausaha.usaha_baru.rencana_mulai_usaha && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1">
                    <Calendar className="text-purple-600" size={16}/>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Timeline Pelaksanaan</h4>
                    <p className="text-gray-600">{wirausaha.usaha_baru.rencana_mulai_usaha}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {wirausaha.tipe_usaha === "Usaha Ongoing" && wirausaha.usaha_ongoing && (
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="text-green-500" size={20} />
              Detail Usaha Berjalan
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              {wirausaha.usaha_ongoing.estimasi_omzet && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mt-1">
                    <DollarSign className="text-green-600" size={16}/>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Omzet Bulanan</h4>
                    <p className="text-gray-600">{wirausaha.usaha_ongoing.estimasi_omzet}</p>
                  </div>
                </div>
              )}
              
              {wirausaha.usaha_ongoing.tahun_berdiri && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mt-1">
                    <Calendar className="text-blue-600" size={16}/>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-800 mb-1">Lama Beroperasi</h4>
                    <p className="text-gray-600">
                    {new Date().getFullYear() - Number(wirausaha.usaha_ongoing?.tahun_berdiri)} tahun
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* UsahaBaruCard component - if you still want to use it */}
        {wirausaha.tipe_usaha === "Usaha Baru"
            ? <UsahaBaruCard wirausaha={wirausaha}/>
            : <UsahaOngoingCard wirausaha={wirausaha}/>}
      </div>
    </div>
  );
};

export default WirausahaDetail;