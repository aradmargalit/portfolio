import { redirect } from 'next/navigation';

function NotFoundPage() {
  redirect('/');
}

export default NotFoundPage;
