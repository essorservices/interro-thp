import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ExamRunner from "@/components/ExamRunner";
import PaperLoading from "@/components/PaperLoading";
import { EXAMS, parseExamId } from "@/data/exams";

type Params = PageProps<"/exam/[id]">["params"];

export function generateStaticParams() {
  return EXAMS.map((_, i) => ({ id: String(i + 1) }));
}

export async function generateMetadata(props: PageProps<"/exam/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  return { title: `Mock ${id}` };
}

// The params are read inside <Suspense> so navigations into this page stay instant.
export default function ExamPage(props: PageProps<"/exam/[id]">) {
  return (
    <Suspense fallback={<PaperLoading />}>
      <Exam params={props.params} />
    </Suspense>
  );
}

async function Exam({ params }: { params: Params }) {
  const { id } = await params;
  const index = parseExamId(id);
  if (index === null) notFound();
  return <ExamRunner index={index} />;
}
