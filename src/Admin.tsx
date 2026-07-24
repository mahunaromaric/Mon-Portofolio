import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthGuard } from './components/admin/AuthGuard'
import { AdminLayout } from './components/admin/AdminLayout'
import { DashboardPage } from './components/admin/DashboardPage'
import { ProjectsPage } from './components/admin/ProjectsPage'
import { MessagesPage } from './components/admin/MessagesPage'

export default function Admin() {
  return (
    <AuthGuard>
      <AdminLayout>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </AuthGuard>
  )
}
