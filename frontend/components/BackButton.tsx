import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type BackButtonProps = {
    href?: string;
    label?: string;
}

const BackButton = ({ href = "/dashboard", label = "Voltar" }: BackButtonProps) => {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-blue-500 transition-colors mb-6 group font-medium"
        >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            {label}
        </Link>
    )
}

export default BackButton;