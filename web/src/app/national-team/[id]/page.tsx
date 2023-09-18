import { querier } from "@/actions/querier";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await querier.team(params.id);
  if (!data) {
    return notFound();
  }

  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          Team:{" "}
          <Link className="text-indigo-500 hover:underline" href={`/national-team/${data.id}`}>
            {data.name}
          </Link>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-10">
        <div className="max-w-[200px] min-w-[200px]">
          <img className="w-full" src={data.img ?? "/images/unknown_user.png"} alt="player's avatar" />
        </div>
        <div className="flex-grow">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="w-[160px]">
                  <b>Name</b>
                </td>
                <td>{data.name}</td>
              </tr>
              {data.des && (
                <tr>
                  <td>
                    <b>About</b>
                  </td>
                  <td>{data.des}</td>
                </tr>
              )}
              {data.rank && (
                <tr>
                  <td>
                    <b>Rank</b>
                  </td>
                  <td>{data.rank}</td>
                </tr>
              )}
              {data.country && data.countryName && (
                <tr>
                  <td>
                    <b>Country</b>
                  </td>
                  <td>
                    <Link href={data.country} className="text-sky-500 hover:underline">
                      {data.countryName}
                    </Link>
                  </td>
                </tr>
              )}
              {data.area && data.areaName && (
                <tr>
                  <td>
                    <b>Continent</b>
                  </td>
                  <td>
                    <Link href={data.area} className="text-sky-500 hover:underline">
                      {data.areaName}
                    </Link>
                  </td>
                </tr>
              )}
              {data.seasons.length && (
                <tr>
                  <td>
                    <b>League seasons</b>
                  </td>
                  <td>
                    <ul className="list-disc mx-4">
                      {data.seasons.map((item) => {
                        return (
                          <li key={item.ls}>
                            <Link href={item.ls} className="inline text-sky-500 hover:underline">
                              {item.lsName} {item.year && `(${item.year})`}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              )}
              {data.titles.length && (
                <tr>
                  <td>
                    <b>Titles</b>
                  </td>
                  <td>
                    <ul className="list-disc mx-4">
                      {data.titles.map((item, index) => {
                        return (
                          <li key={index}>
                            <Link href={item.title} className="inline text-sky-500 hover:underline">
                              {item.titleName}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
