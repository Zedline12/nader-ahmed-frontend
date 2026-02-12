import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const courseId = params.id;

  const formData = await req.formData();
  console.log(formData, courseId);
  const response = await fetchWithToken(`/courses/${courseId}/lessons`, {
    method: "POST",
    headers: [["content", "multipart/form-data"]],
    body: formData,
  });

  const data = await response.json();
  console.log(data);
  return NextResponse.json(data);
}
