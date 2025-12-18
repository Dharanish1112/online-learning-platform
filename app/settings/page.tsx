"use client"

import { useState } from "react"
import { useTheme } from "next-themes"
import Sidebar from "@/components/sidebar"
import Header from "@/components/header"
import { User, Bell, Lock, Palette, Globe, Moon, Sun, Monitor, Save, Check, Eye, EyeOff, ShieldCheck, AlertTriangle } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  // Profile settings
  const [name, setName] = useState("Dharanish S")
  const [email, setEmail] = useState("dharanish@example.com")
  const [bio, setBio] = useState("Passionate learner exploring ML, IoT, and web development.")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [lessonReminders, setLessonReminders] = useState(true)
  const [discussionReplies, setDiscussionReplies] = useState(true)
  const [weeklyDigest, setWeeklyDigest] = useState(false)

  // Language settings
  const [language, setLanguage] = useState("en")
  const [timezone, setTimezone] = useState("GMT+5:30")

  // Save state
  const [saved, setSaved] = useState(false)

  // Password dialog
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [passwordError, setPasswordError] = useState<string | null>(null)
  const [passwordSuccess, setPasswordSuccess] = useState(false)

  // 2FA state
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [show2FADialog, setShow2FADialog] = useState(false)

  // Delete account dialog
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [deleteConfirmText, setDeleteConfirmText] = useState("")

  // Photo upload state
  const [photoUpdated, setPhotoUpdated] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const handleChangePassword = () => {
    setPasswordError(null)

    if (!currentPassword) {
      setPasswordError("Please enter your current password.")
      return
    }
    if (newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.")
      return
    }
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.")
      return
    }

    // Simulate password change success
    setPasswordSuccess(true)
    setTimeout(() => {
      setShowPasswordDialog(false)
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
      setPasswordSuccess(false)
    }, 1500)
  }

  const handleToggle2FA = () => {
    if (twoFactorEnabled) {
      // Disable 2FA
      setTwoFactorEnabled(false)
    } else {
      // Show 2FA setup dialog
      setShow2FADialog(true)
    }
  }

  const handleEnable2FA = () => {
    setTwoFactorEnabled(true)
    setShow2FADialog(false)
  }

  const handleDeleteAccount = () => {
    if (deleteConfirmText === "DELETE") {
      // Simulate account deletion
      alert("Account deletion initiated. You will be logged out.")
      setShowDeleteDialog(false)
    }
  }

  const handlePhotoChange = () => {
    setPhotoUpdated(true)
    setTimeout(() => setPhotoUpdated(false), 2000)
  }

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] dark:bg-gray-900">
      <Sidebar />
      <main className="flex-1 ml-24">
        <Header />
        <div className="p-8 max-w-4xl">
          <div className="mb-8 animate-fadeInUp">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Settings</h1>
            <p className="text-gray-600 dark:text-gray-400">Manage your account settings and preferences.</p>
          </div>

          <div className="space-y-6">
            {/* Profile Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                  <User className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Profile</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center text-white text-2xl font-bold">
                    {name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <button
                    onClick={handlePhotoChange}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      photoUpdated
                        ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {photoUpdated ? "✓ Photo Updated" : "Change Photo"}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Bio</label>
                  <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.2s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                  <Bell className="text-orange-600 dark:text-orange-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Notifications</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: "Email Notifications", desc: "Receive updates via email", value: emailNotifications, setter: setEmailNotifications },
                  { label: "Push Notifications", desc: "Browser push notifications", value: pushNotifications, setter: setPushNotifications },
                  { label: "Lesson Reminders", desc: "Get reminded before scheduled lessons", value: lessonReminders, setter: setLessonReminders },
                  { label: "Discussion Replies", desc: "Notify when someone replies to your discussion", value: discussionReplies, setter: setDiscussionReplies },
                  { label: "Weekly Digest", desc: "Weekly summary of your progress", value: weeklyDigest, setter: setWeeklyDigest },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{item.label}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => item.setter(!item.value)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${
                        item.value ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                          item.value ? "left-7" : "left-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.3s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                  <Palette className="text-purple-600 dark:text-purple-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Theme</label>
                <div className="flex gap-3">
                  {[
                    { value: "light", icon: Sun, label: "Light" },
                    { value: "dark", icon: Moon, label: "Dark" },
                    { value: "system", icon: Monitor, label: "System" },
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setTheme(opt.value)}
                      className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                        theme === opt.value
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                          : "border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <opt.icon size={18} />
                      <span className="font-medium">{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.4s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                  <Globe className="text-green-600 dark:text-green-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Language & Region</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Language</label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="en">English</option>
                    <option value="es">Español</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                    <option value="hi">हिन्दी</option>
                    <option value="ta">தமிழ்</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Timezone</label>
                  <select
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="GMT+5:30">India (GMT+5:30)</option>
                    <option value="GMT+0">UK (GMT+0)</option>
                    <option value="GMT-5">US Eastern (GMT-5)</option>
                    <option value="GMT-8">US Pacific (GMT-8)</option>
                    <option value="GMT+1">Europe Central (GMT+1)</option>
                    <option value="GMT+9">Japan (GMT+9)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Security */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm animate-fadeInUp" style={{ animationDelay: "0.5s" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
                  <Lock className="text-red-600 dark:text-red-400" size={20} />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Security</h2>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Change Password</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Update your password regularly for security</p>
                  </div>
                  <button
                    onClick={() => setShowPasswordDialog(true)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Update
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {twoFactorEnabled ? "2FA is enabled for your account" : "Add an extra layer of security"}
                    </p>
                  </div>
                  <button
                    onClick={handleToggle2FA}
                    className={`px-4 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      twoFactorEnabled
                        ? "border-green-500 text-green-600 bg-green-50 dark:bg-green-900/20 hover:bg-green-100"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    }`}
                  >
                    {twoFactorEnabled ? "✓ Enabled" : "Enable"}
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="font-medium text-red-600">Delete Account</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and data</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteDialog(true)}
                    className="px-4 py-2 border border-red-300 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-end animate-fadeInUp" style={{ animationDelay: "0.6s" }}>
              <button
                onClick={handleSave}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-white transition-all ${
                  saved ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {saved ? (
                  <>
                    <Check size={20} /> Saved!
                  </>
                ) : (
                  <>
                    <Save size={20} /> Save Changes
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Password Change Dialog */}
        <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white">Change Password</DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Enter your current password and choose a new one.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">New Password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 pr-10 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              {passwordSuccess && (
                <p className="text-sm text-green-600 flex items-center gap-2">
                  <Check size={16} /> Password updated successfully!
                </p>
              )}
            </div>

            <DialogFooter className="pt-4">
              <button
                type="button"
                onClick={() => {
                  setShowPasswordDialog(false)
                  setPasswordError(null)
                  setCurrentPassword("")
                  setNewPassword("")
                  setConfirmPassword("")
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleChangePassword}
                disabled={passwordSuccess}
                className="px-4 py-2 rounded-lg bg-blue-600 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
              >
                Update Password
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* 2FA Setup Dialog */}
        <Dialog open={show2FADialog} onOpenChange={setShow2FADialog}>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white flex items-center gap-2">
                <ShieldCheck className="text-green-600" size={24} />
                Enable Two-Factor Authentication
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col items-center py-4">
              {/* Simulated QR code */}
              <div className="w-48 h-48 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center mb-4">
                <div className="grid grid-cols-8 gap-1">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-4 h-4 ${Math.random() > 0.5 ? "bg-black" : "bg-white"}`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Or enter this code manually: <br />
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-sm font-mono">
                  ABCD-EFGH-IJKL-MNOP
                </code>
              </p>
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => setShow2FADialog(false)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEnable2FA}
                className="px-4 py-2 rounded-lg bg-green-600 text-sm font-semibold text-white hover:bg-green-700"
              >
                I've Scanned the Code
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Delete Account Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="bg-white dark:bg-gray-800">
            <DialogHeader>
              <DialogTitle className="dark:text-white flex items-center gap-2 text-red-600">
                <AlertTriangle size={24} />
                Delete Account
              </DialogTitle>
              <DialogDescription className="dark:text-gray-400">
                This action is permanent and cannot be undone. All your data, courses, progress, and achievements will be deleted.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                Type <strong>DELETE</strong> to confirm:
              </p>
              <input
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="DELETE"
                className="w-full rounded-lg border border-red-300 bg-white dark:bg-gray-700 px-3 py-2 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <DialogFooter>
              <button
                type="button"
                onClick={() => {
                  setShowDeleteDialog(false)
                  setDeleteConfirmText("")
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleteConfirmText !== "DELETE"}
                className="px-4 py-2 rounded-lg bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Delete My Account
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  )
}
