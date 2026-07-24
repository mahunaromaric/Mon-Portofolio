import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthGuard } from './components/admin/AuthGuard'
import { AdminLayout } from './components/admin/AdminLayout'
import { DashboardPage } from './components/admin/DashboardPage'
import { ProjectsPage } from './components/admin/ProjectsPage'
import { SkillsPage } from './components/admin/SkillsPage'
import { ExperiencesPage } from './components/admin/ExperiencesPage'
import { ArticlesPage } from './components/admin/ArticlesPage'
import { MessagesPage } from './components/admin/MessagesPage'

import { AnalyticsPage } from './components/admin/AnalyticsPage'

export default function Admin() {
  return (
    <AuthGuard>
      <AdminLayout>
        <Routes>
          <Route index element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="experiences" element={<ExperiencesPage />} />
          <Route path="articles" element={<ArticlesPage />} />
          <Route path="messages" element={<MessagesPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </AdminLayout>
    </AuthGuard>
  )
}
