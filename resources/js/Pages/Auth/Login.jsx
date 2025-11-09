import ApplicationLogo from '@/Components/ApplicationLogo';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Alert, AlertDescription } from '@/Components/ui/alert';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import GuestLayout from '@/Layouts/GuestLayout';
import { useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <div className="w-full lg:grid lg:min-h-screen lg:grid-cols-2">
            {/* side left */}
            <div className="flex flex-col px-4 py-6">
                <ApplicationLogo bgLogo="from-blue-500 via-blue-600 to-blue-600" colorLogo="text-white" />
                <div className="flex flex-col items-center justify-center py-12 lg:py-48">
                    <div className="mx-auto flex w-full flex-col gap-6 lg:w-1/2">
                        <div className="grid gap-2 text-center">
                            {status && (
                                <Alert variant="success">
                                    <AlertDescription>{status}</AlertDescription>
                                </Alert>
                            )}
                            <h1 className="text-3xl font-bold text-foreground">Login</h1>
                            <p className="text-balance text-muted-foreground">
                                Selamat Datang di website SIAKAD, Silahkan Login terlebih dahulu
                            </p>
                            {/* Form */}
                            <form onSubmit={handleSubmit} className="grid gap-6">
                                {/* Email */}
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="block text-left">
                                        Email
                                    </Label>
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

                                {/* Password */}
                                <div className="grid gap-2">
                                    <Label htmlFor="password" className="block text-left">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        placeholder="Masukan Password"
                                        autoComplete="current-password"
                                        value={data.password}
                                        onChange={(e) => setData(e.target.name, e.target.value)}
                                    />
                                    {errors.password && <InputError message={errors.password} />}
                                </div>

                                {/* Remember */}
                                <div className="mt-2 flex items-center space-x-2">
                                    <Checkbox
                                        id="remember"
                                        checked={data.remember}
                                        onCheckedChange={(checked) => setData('remember', checked)}
                                    />
                                    <Label htmlFor="remember">Ingatkan Saya</Label>
                                </div>

                                {/* Button Submit */}
                                <Button
                                    type="submit"
                                    variant="blue"
                                    size="xl"
                                    className="mt-4 w-full"
                                    disabled={processing}
                                >
                                    Login
                                </Button>
                            </form>
                            {/* End Form */}
                        </div>
                    </div>
                </div>
            </div>
            {/* end side left */}

            {/* Side Right */}
            <div className="hidden bg-muted lg:block">
                <img
                    src="/build/images/bg-login.webp"
                    className="h-full max-h-screen w-full object-cover"
                    alt="login"
                />
            </div>
            {/* End Side Right */}
        </div>
    );
}
Login.layout = (page) => <GuestLayout children={page} title="Login" />;
