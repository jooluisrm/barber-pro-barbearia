type Props = {
    title: string;
    subtitle?: string;
}

export const TitlePage = ({ title, subtitle }: Props) => {
    return (
        <div className="text-center">
            <div className="text-4xl font-extrabold pb-5">
                {title}
            </div>
            {
                subtitle && (
                    <h1 className="text-4xl pb-5">
                        {subtitle}
                    </h1>
                )
            }
        </div>
    );
}