import { useRouter, useSearchParams } from "next/navigation";
import { trpc } from "../_trpc/client";

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
        }
    });
}
export default Page;