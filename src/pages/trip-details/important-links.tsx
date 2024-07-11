import { Link2, Plus } from "lucide-react";
import { Button } from "../../components/button";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

interface ImportantLinks {
  id: string
  title: string
  url: string
}

export function ImportantLinks({ 
  openCreateLinkModal 
}: ImportantLinksProps) {
  const { tripId } = useParams()
  const [importantLinks, setImportantLinks] = useState<ImportantLinks[]>([])

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setImportantLinks(response.data.links))
  }, [tripId])

  function copyLink(link: string) {
    navigator.clipboard.writeText(link)
    alert("Link copiado!")
  }

  return(
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links Importantes</h2>
      <div className="space-y-5">
        {importantLinks.map((link) => {
          return(
                <div key={link.id} className="flex items-center justify-between gap-4">
                  <div className="space-y-1.5 flex-1">
                    <span className="block font-medium text-zinc-100">{link.title}</span>
                    <a href="#" className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                      {link.url}
                    </a>
                  </div>
                  <button title="Copiar Link" onClick={() => copyLink(link.url)}>
                    <Link2 className="text-zinc-400 size-5"/>
                  </button>
                </div>
              )}
          )}
      </div>
    
      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}