import { JenisUsaha, TargetPasar, Wirausaha } from '@/types';
import type { Investor } from '@/types/investor';

import ProfileFormInvestor from './forms/ProfileFormInvestor';
import ProfileFormUsahaBaru from './forms/ProfileFormUsahaBaru';
import ProfileFormUsahaOngoing from './forms/ProfileFormUsahaOngoing';

interface Props {
    role: string;
    tipeUsaha?: string;
    investor?: Investor;
    wirausaha?: Wirausaha;
    listJenisUsaha: JenisUsaha[];
    listTargetPasar: TargetPasar[];
}

export default function ProfileTab({ role, tipeUsaha, investor, wirausaha, listJenisUsaha, listTargetPasar }: Props) {
    if (role === 'Investor') {
        return (
            <div>
                {/* <h2 className="mb-4 text-xl font-semibold">Edit Profil - Investor</h2> */}
                <ProfileFormInvestor investor={investor} listJenisUsaha={listJenisUsaha} listTargetPasar={listTargetPasar} />
            </div>
        );
    }

    if (role === 'Wirausaha') {
        if (tipeUsaha === 'Usaha Baru') {
            return (
                <div>
                    {/* <h2 className="mb-4 text-xl font-semibold">Edit Profil - Usaha Baru</h2> */}
                    <ProfileFormUsahaBaru wirausaha={wirausaha} listJenisUsaha={listJenisUsaha} listTargetPasar={listTargetPasar} />
                </div>
            );
        }

        if (tipeUsaha === 'Usaha Ongoing') {
            return (
                <div>
                    {/* <h2 className="mb-4 text-xl font-semibold">Edit Profil - Usaha Ongoing</h2> */}
                    <ProfileFormUsahaOngoing wirausaha={wirausaha} listJenisUsaha={listJenisUsaha} listTargetPasar={listTargetPasar} />
                </div>
            );
        }
    }
    console.log('role:', role);
    console.log('investor:', investor);
    console.log('wirausaha:', wirausaha);

    return <div>Data profil tidak ditemukan atau role belum terdeteksi.</div>;
}
