const HeroStatCard = ({
  value,
  label,
}: {
  value: string;
  label: string;
}) => {
  return (
    <div className="rounded-2xl border bg-muted/30 p-5">

      <h3 className="text-3xl font-bold">
        {value}
      </h3>

      <p className="mt-2 text-sm text-muted-foreground">
        {label}
      </p>

    </div>
  );
}

export default HeroStatCard;