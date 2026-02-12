import { fetchWithToken } from "@/lib/fetcher";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  req: NextRequest,
  props: { params: Promise<{ id: string }> },
) {
  const params = await props.params;
  const courseId = params.id;

  const formData = await req.formData();
  console.log(formData, courseId);
  const response = await fetchWithToken(`/courses/${courseId}/thumbnail`, {
    method: "PATCH",
    body: formData,
  });

  const data = await response.json();

  return NextResponse.json(data);
}
