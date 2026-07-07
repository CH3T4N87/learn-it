export interface CourseCardProps {
  id: string
  title: string,
  description: string,
  capacity: number,
  instructor?: string | null,
  instructorId: string | null
}