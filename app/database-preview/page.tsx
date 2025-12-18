"use client"

import { useState, useEffect } from "react"
import { Database, FileText, Search, ChevronRight, ChevronLeft } from "lucide-react"
import Header from "@/components/header"

interface Collection {
  name: string
  count: number
}

interface Document {
  _id: string
  [key: string]: any
}

interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export default function DatabasePreviewPage() {
  const [collections, setCollections] = useState<Collection[]>([])
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null)
  const [documents, setDocuments] = useState<Document[]>([])
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 25,
    total: 0,
    totalPages: 0,
  })
  const [query, setQuery] = useState<string>("{}")
  const [loading, setLoading] = useState(false)
  const [viewMode, setViewMode] = useState<"list" | "json" | "table">("list")

  // Fetch collections on mount
  useEffect(() => {
    fetchCollections()
  }, [])

  // Fetch documents when collection or query changes
  useEffect(() => {
    if (selectedCollection) {
      fetchDocuments(selectedCollection, pagination.page, query)
    }
  }, [selectedCollection, pagination.page, query])

  const fetchCollections = async () => {
    try {
      const response = await fetch("/api/database/collections")
      const data = await response.json()
      setCollections(data.collections || [])
      if (data.collections && data.collections.length > 0 && !selectedCollection) {
        setSelectedCollection(data.collections[0].name)
      }
    } catch (error) {
      console.error("Error fetching collections:", error)
    }
  }

  const fetchDocuments = async (
    collectionName: string,
    page: number = 1,
    queryString: string = "{}"
  ) => {
    setLoading(true)
    try {
      const response = await fetch(
        `/api/database/collections/${collectionName}?page=${page}&limit=${pagination.limit}&query=${encodeURIComponent(queryString)}`
      )
      const data = await response.json()
      if (data.error) {
        console.error("Error:", data.error)
        setDocuments([])
        setPagination({ ...pagination, total: 0, totalPages: 0 })
      } else {
        setDocuments(data.documents || [])
        setPagination(data.pagination || pagination)
      }
    } catch (error) {
      console.error("Error fetching documents:", error)
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }

  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCollection) {
      setPagination({ ...pagination, page: 1 })
      fetchDocuments(selectedCollection, 1, query)
    }
  }

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, page: newPage })
    }
  }

  const formatValue = (value: any): string => {
    if (value === null) return "null"
    if (value === undefined) return "undefined"
    if (typeof value === "string") return `"${value}"`
    if (typeof value === "object" && value instanceof Date) {
      return value.toISOString()
    }
    if (typeof value === "object") {
      return JSON.stringify(value, null, 2)
    }
    return String(value)
  }

  const renderDocumentList = (doc: Document) => (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
      <div className="space-y-2">
        {Object.entries(doc).map(([key, value]) => (
          <div key={key} className="flex gap-4">
            <div className="font-mono text-sm text-gray-500 dark:text-gray-400 min-w-[150px]">
              {key}:
            </div>
            <div className="font-mono text-sm text-gray-900 dark:text-gray-100 break-all">
              {formatValue(value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )

  const renderDocumentJSON = (doc: Document) => (
    <pre className="bg-gray-50 dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700 overflow-x-auto">
      <code className="text-sm text-gray-900 dark:text-gray-100">
        {JSON.stringify(doc, null, 2)}
      </code>
    </pre>
  )

  const renderDocumentTable = (docs: Document[]) => {
    if (docs.length === 0) return null

    const allKeys = new Set<string>()
    docs.forEach((doc) => {
      Object.keys(doc).forEach((key) => allKeys.add(key))
    })
    const keys = Array.from(allKeys)

    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {keys.map((key) => (
                <th
                  key={key}
                  className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                >
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {docs.map((doc, idx) => (
              <tr
                key={doc._id || idx}
                className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {keys.map((key) => (
                  <td key={key} className="p-3 text-sm text-gray-900 dark:text-gray-100">
                    <div className="max-w-xs truncate" title={formatValue(doc[key])}>
                      {formatValue(doc[key])}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      {/* Database Preview Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Database Preview
            </h1>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            localhost:27017 &gt; olip
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-80px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="p-4">
            <div className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-3">
              Collections ({collections.length})
            </div>
            <div className="space-y-1">
              {collections.map((collection) => (
                <button
                  key={collection.name}
                  onClick={() => {
                    setSelectedCollection(collection.name)
                    setPagination({ ...pagination, page: 1 })
                  }}
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center justify-between ${
                    selectedCollection === collection.name
                      ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    {collection.name}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {collection.count}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {selectedCollection ? (
            <>
              {/* Collection Header */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <span>localhost:27017</span>
                  <ChevronRight className="w-4 h-4" />
                  <span>olip</span>
                  <ChevronRight className="w-4 h-4" />
                  <span className="text-gray-900 dark:text-gray-100 font-medium">
                    {selectedCollection}
                  </span>
                </div>
              </div>

              {/* Tabs */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6">
                <div className="flex items-center gap-6">
                  <button className="px-4 py-2 border-b-2 border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 font-medium text-sm">
                    Documents
                  </button>
                  <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm">
                    Schema
                  </button>
                  <button className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 text-sm">
                    Indexes
                  </button>
                </div>
              </div>

              {/* Query Bar */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
                <form onSubmit={handleQuerySubmit} className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder='Type a query: { "field": "value" }'
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
                  >
                    Find
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery("{}")
                      setPagination({ ...pagination, page: 1 })
                    }}
                    className="px-4 py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-md text-sm font-medium transition-colors"
                  >
                    Reset
                  </button>
                </form>
              </div>

              {/* View Mode Toggle */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${
                      viewMode === "list"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    title="List View"
                  >
                    <FileText className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("json")}
                    className={`p-2 rounded ${
                      viewMode === "json"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    title="JSON View"
                  >
                    {"{}"}
                  </button>
                  <button
                    onClick={() => setViewMode("table")}
                    className={`p-2 rounded ${
                      viewMode === "table"
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
                        : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    title="Table View"
                  >
                    <Database className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {pagination.total > 0
                    ? `${(pagination.page - 1) * pagination.limit + 1}-${Math.min(
                        pagination.page * pagination.limit,
                        pagination.total
                      )} of ${pagination.total}`
                    : "0 of 0"}
                </div>
              </div>

              {/* Documents Area */}
              <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-gray-500 dark:text-gray-400">Loading...</div>
                  </div>
                ) : documents.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <FileText className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                      <div className="text-gray-500 dark:text-gray-400">
                        No documents found
                      </div>
                    </div>
                  </div>
                ) : viewMode === "table" ? (
                  <div className="p-6">{renderDocumentTable(documents)}</div>
                ) : (
                  <div>
                    {documents.map((doc, idx) => (
                      <div key={doc._id || idx}>
                        {viewMode === "json"
                          ? renderDocumentJSON(doc)
                          : renderDocumentList(doc)}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handlePageChange(pagination.page - 1)}
                      disabled={pagination.page === 1}
                      className="p-2 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handlePageChange(pagination.page + 1)}
                      disabled={pagination.page === pagination.totalPages}
                      className="p-2 rounded border border-gray-300 dark:border-gray-600 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <Database className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                <div className="text-gray-500 dark:text-gray-400">
                  Select a collection to view documents
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
