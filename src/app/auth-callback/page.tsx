"use client"
import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";
import { Loader2 } from "lucide-react";

const Page = () => {

    const router = useRouter();

    const searchParamas = useSearchParams();
    const origin = searchParamas.get('origin');

    const {data, isLoading} = trpc.authCallback.useQuery(undefined, {
        onSuccess : ({succes}) => {
            if(succes) {
                //user is synced to database --> so it was succesfull
                router.push(origin ? `/${origin}` : "/dashboard")
            }
        },
        onError: (e) => {
            if(e.data?.code === "UNAUTHORIZED") {
                router.push("/sign-in")
            }
        },
        retry : true,
        retryDelay: 500
    });

    return(
        <div className="w-full mt-24 flex justify-center">
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin text-zinc-800"/>
                <h3 className="font-semibold text-xl">Setting up your account...</h3>
                <p>You will be redirected automatically.</p>
            </div>
        </div>
    )
}
export default Page;