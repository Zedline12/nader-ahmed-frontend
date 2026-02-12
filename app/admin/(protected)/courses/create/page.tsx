import { Card, CardHeader, CardTitle ,CardContent} from "@/components/ui/card";
import { CreateCourseForm } from "@/features/admin/courses/forms/create-course-form";

export default function CreateCoursePage() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Create new course !
                </CardTitle>
            </CardHeader>
            <CardContent>
              <CreateCourseForm></CreateCourseForm>
            </CardContent>
        </Card>
    );
}
