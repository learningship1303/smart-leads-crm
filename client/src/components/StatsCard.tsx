interface Props {
  title: string;
  count: number;
  color: string;
}

function StatsCard({
  title,
  count,
  color,
}: Props) {

  return (

    <div
      className={`${color} text-white p-6 rounded-xl`}
    >

      <h2>{title}</h2>

      <p className="text-4xl font-bold mt-2">
        {count}
      </p>

    </div>

  );
}

export default StatsCard;