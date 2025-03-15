import { Words } from "@/models/englishwords.model";
import TypeArea from "./_components/TypeArea";

export default async function Home() {
  const response = await fetch(
    `https://monkeytype.com/languages/english.json`
  );
  const data: Words = await response.json();

  return <TypeArea data={data} />;
}
