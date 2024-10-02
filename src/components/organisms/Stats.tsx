import colors from "../../colors";

const stats = [
  { id: 1, name: "Transactions every 24 hours", value: "44 million" },
  { id: 2, name: "Assets under holding", value: "$119 trillion" },
  { id: 3, name: "New users annually", value: "46,000" },
];

export default function Stats() {
  return (
    <div className="my-10 lg:py-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="mx-auto w-full max-w-xs flex flex-col gap-y-4 text-gray-100 p-6 rounded-lg shadow-lg"
              style={{ backgroundColor: colors.lightRed }}
            >
              <dt
                className="text-base leading-7"
                style={{ color: colors.grey }}
              >
                {stat.name}
              </dt>
              <dd
                className="order-first text-2xl font-semibold tracking-tight text-white sm:text-4xl"
                style={{ color: colors.grey }}
              >
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
