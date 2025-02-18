const VaryProfile = ({
    ProfileName,
    ProfileUrl,
}: {
    ProfileName: string
    ProfileUrl: string
}) => {
    const colors: string[] = ['cyan', 'blue', 'red']

    const random = (max: number): number => Math.floor(Math.random() * max)

    const color = colors[random(colors.length)]

    return (
        <div className="flex items-center object-center w-50 justify-center">
            {ProfileUrl && (
                <img
                    className="rounded-full w-8 h-8"
                    src={ProfileUrl}
                    alt={ProfileName}
                />
            )}
            {!ProfileUrl && (
                <div
                    className={`flex justify-center items-center rounded-full w-8 h-8 text-white bg-${color}-500`}>
                    {ProfileName.substring(0, 1)}
                </div>
            )}
        </div>
    )
}

export default VaryProfile
