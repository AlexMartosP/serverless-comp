"use client";

import { Button } from "ui";
import { Label } from "ui";
import { RadioGroup, RadioGroupItem } from "ui";
import { useState } from "react";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("ui").then((mod) => mod.Chart), {
  ssr: false,
});

type Status = "idle" | "pending";
type Data = {
  fetchNum: number;
  serverless_processingTime: number;
  serverless_coldStart: boolean;
  serverless_endToEndTime: number;
};

export default function APIFetcher() {
  const [selections, setSelections] = useState({
    numOfQueries: "1",
  });
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<Data[]>([]);

  function updateSelection(key: keyof typeof selections, value: string) {
    setSelections((prev) => ({ ...prev, [key]: value }));
  }

  async function fetchServerless() {
    const startTime = Date.now();

    const res = await fetch(
      `/api/serverless?numofqueries=${selections.numOfQueries}`
    );
    const data = await res.json();

    return {
      serverless_processingTime: data.duration,
      serverless_coldStart: data.isColdStart,
      serverless_endToEndTime: Date.now() - startTime,
    };
  }

  async function startFetching() {
    setData([]);
    setStatus("pending");

    for (let i = 1; i <= 5; i++) {
      const serverless = await fetchServerless();

      setData((prev) => [
        ...prev,
        {
          fetchNum: i,
          ...serverless,
        },
      ]);
    }

    setStatus("idle");
  }

  return (
    <div className="p-4 border rounded-md">
      <div>
        <h2 className="font-semibold text-md">Number of queries</h2>
        <p>Select number of queries to the database from the route handler</p>
        <RadioGroup
          defaultValue={selections.numOfQueries}
          onValueChange={(value) => updateSelection("numOfQueries", value)}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="1" />
            <Label htmlFor="1">Single query</Label>
            <RadioGroupItem value="2" id="2" />
            <Label htmlFor="2">2 queries</Label>{" "}
            <RadioGroupItem value="5" id="5" />
            <Label htmlFor="5">5 queries</Label>
          </div>
        </RadioGroup>
      </div>
      <div className="py-4"></div>
      <Button disabled={status !== "idle"} onClick={startFetching}>
        {status === "idle" ? "Start fetching" : "Fetching..."}
      </Button>
      <div className="py-4"></div>
      <div className="flex gap-24">
        <div>
          <h2 className="font-semibold text-2xl">Processing time</h2>
          <p>This is the time it took for the route handler to process</p>
          <div className="py-2"></div>
          <Chart
            data={data}
            width={500}
            height={500}
            line1Key="serverless_processingTime"
          />
        </div>
        <div>
          <h2 className="font-semibold text-2xl">End to end time</h2>
          <p>
            This is the time it took for the entire request to get a response
          </p>
          <div className="py-2"></div>
          <Chart
            data={data}
            width={500}
            height={500}
            line1Key="serverless_endToEndTime"
          />
        </div>
      </div>
    </div>
  );
}
