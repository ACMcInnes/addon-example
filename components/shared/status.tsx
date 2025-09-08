import Link from "next/link";

async function getStatus() {
  // webstore and secret passed from AuthJS
  const res = await fetch(
    `https://uptime.betterstack.com/api/v2/monitors/3030029`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.BETTER_STACK_AUTH}`,
      },
    }
  );

  console.log(`BETTERSTACK - GET STATUS RESPONSE:`);
  console.log(`${res.status} - ${res.statusText}`);

  if (!res.ok || res.status !== 200) {
    console.log("Failed to fetch integration status");
    // This will activate the closest `error.js` Error Boundary
    return null;
  }
  return res.json();
}

export default async function Status() {
  const betterstack = await getStatus();

  // console.log(`BETTER STACK RESPONSE`);
  // console.log(betterstack);

  const statuses: {
    [key: string]: { style: string; text: string };
  } = {
    up: { style: "text-green-400 bg-green-400/10", text: "System Normal" },
    down: { style: "text-rose-400 bg-rose-400/10", text: "System Down" },
    validating: {
      style: "text-yellow-400 bg-yellow-400/10",
      text: "System Monitoring",
    },
    maintenance: {
      style: "text-yellow-400 bg-yellow-400/10",
      text: "System Maintenance",
    },
    pending: {
      style: "text-gray-400 bg-gray-400/10",
      text: "System Status Unavailable",
    },
    paused: {
      style: "text-gray-400 bg-gray-400/10",
      text: "System Status Unavailable",
    },
  };

  let statusPage = `https://status.mcinnes.design/`;

  if (betterstack) {
    let status = betterstack.data.attributes.status as string;
    return (
      <Link
        href={statusPage}
        className="flex items-center justify-end gap-x-2 sm:justify-start"
        target="_blank"
      >
        <div
          className={`hover:animate-pulse ${statuses[status].style} flex-none rounded-full p-1`}
        >
          <div className="size-3 rounded-full bg-current" />
        </div>
        <div className="text-white text-xs">{statuses[status].text}</div>
      </Link>
    );
  } else {
    return (
      <Link
        href={statusPage}
        className="flex items-center justify-end gap-x-2 sm:justify-start"
        target="_blank"
      >
        <div
          className={`hover:animate-pulse text-green-400 bg-green-400/10 flex-none rounded-full p-1`}
        >
          <div className="size-3 rounded-full bg-current" />
        </div>
        <div className="text-white text-xs">System Status</div>
      </Link>
    );
  }
}
