import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import ApplicationLogo from '@/Components/ApplicationLogo';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import Dashboard from '../Dashboard';
import { Children } from 'react';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import Checkbox from '@/Components/Checkbox';
import { Button } from '@/Components/ui/button';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const HandleChange = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className='w-full lg:grid lg:min-h-screen lg:grid-cols-2'>
            {/* side left */}
            <div className="flex flex-col px-4 py-6">
                <ApplicationLogo
                    bgLogo='from-blue-500 via-blue-600 to-blue-600'
                    colorLogo='text-white'
                />
                <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                    <div className="flex flex-col w-full gap-6 mx-auto lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold text-foreground">Login</h1>
                            <p className="text-balance text-muted-foreground">Selamat Datang di website SIAKAD, Silahkan Login terlebih dahulu</p>
                            <div className="grid gap-6">
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        placeholder="Masukkan Email Anda"
                                        autoComplete="email"
                                        value={data.email}
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    {errors.email && <InputError message={errors.email} />}
                                </div>
                                {/* End Email */}
                                {/* Password */}
                                <div className="grid gap-2">
                                    <div className="flex items-center"></div>
                                    <Label htmlFor="password">Password</Label>
                                    <Input id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Masukan Password"
                                        autoComplete="new-password"
                                        value={data.password}
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>
                                {/* End Password */}
                                {/* Remember */}
                                <div className="grid gap-2">
                                    <div className="flex space-x-2 items-top">
                                        <Checkbox
                                            id="remember"
                                            checked={data.remember}
                                            onCheckedChange={(checked) => setData('remember', checked)}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="remember" className="">Ingatkan Saya</Label>
                                        </div>
                                        {errors.remember && <InputError message={errors.remember} />}
                                    </div>
                                    <Button type="submit" variant="blue" size="xl" className="w-full" disabled={processing}>Login</Button>
                                </div>
                                {/* End Remember */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end side left */}

            {/* Side Right */}
            <div className="hidden bg-muted lg:block">
                <img src='/build/images/bg-login.webp' className='object-cover w-full h-full max-h-screen' alt='login'/>
            </div>
            {/* End Side Right */}
        </div>
    );
}
Login.layout = (page) => <GuestLayout children={page} title='Login' />
