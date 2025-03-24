import { CardComponent } from "@/components/loginAndRegister/CardComponent";



const Register = () => {
    return (
        <main className="sm:ml-14 p-4 min-h-screen">
            <div>
                <h1 className="text-3xl pb-6">Regitrar</h1>
            </div>
            <div className="flex justify-center">
                <div className="lg:min-w-[1000px]">
                    <CardComponent />
                </div>
            </div>
        </main>
    );
}

export default Register;