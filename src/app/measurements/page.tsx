
"use client"

import { useState } from 'react'
import { Ruler, Save, Loader2, Info, ChevronRight, History } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { useToast } from '@/hooks/use-toast'
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase'
import { collection, doc, serverTimestamp } from 'firebase/firestore'
import { setDocumentNonBlocking, addDocumentNonBlocking } from '@/firebase/non-blocking-updates'
import { format } from 'date-fns'

export default function MeasurementsPage() {
  const { user, isUserLoading } = useUser()
  const firestore = useFirestore()
  const { toast } = useToast()
  const [saving, setSaving] = useState(false)

  const [formData, setFormData] = useState({
    label: 'Current Profile',
    chestCircumferenceCm: '',
    waistCircumferenceCm: '',
    hipCircumferenceCm: '',
    shoulderWidthCm: '',
    sleeveLengthCm: '',
    dressLengthCm: '',
    notes: ''
  })

  const measurementsQuery = useMemoFirebase(() => {
    if (!firestore || !user?.uid) return null
    return collection(firestore, 'users', user.uid, 'bespokeMeasurements')
  }, [firestore, user?.uid])

  const { data: history, isLoading: isHistoryLoading } = useCollection(measurementsQuery)

  const handleSave = async () => {
    if (!user) {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to save your measurements."
      })
      return
    }

    setSaving(true)
    const measurementId = doc(collection(firestore, 'placeholder')).id
    const docRef = doc(firestore, 'users', user.uid, 'bespokeMeasurements', measurementId)
    
    const payload = {
      id: measurementId,
      userId: user.uid,
      measurementDate: new Date().toISOString(),
      label: formData.label || 'Measurements',
      chestCircumferenceCm: Number(formData.chestCircumferenceCm),
      waistCircumferenceCm: Number(formData.waistCircumferenceCm),
      hipCircumferenceCm: Number(formData.hipCircumferenceCm),
      shoulderWidthCm: Number(formData.shoulderWidthCm) || 0,
      sleeveLengthCm: Number(formData.sleeveLengthCm) || 0,
      dressLengthCm: Number(formData.dressLengthCm) || 0,
      notes: formData.notes,
      createdAt: serverTimestamp()
    }

    setDocumentNonBlocking(docRef, payload, { merge: true })
    
    setTimeout(() => {
      setSaving(false)
      toast({
        title: "Measurements Saved",
        description: "Your bespoke profile has been updated for future tailoring."
      })
    }, 500)
  }

  if (isUserLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex flex-col items-center justify-center space-y-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground animate-pulse">Loading your profile...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-6">
        <div className="space-y-2">
          <h1 className="font-headline text-5xl font-bold">Bespoke Profile</h1>
          <p className="text-muted-foreground">Store your precise measurements for a perfect Mogra fit.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <Ruler className="h-5 w-5 text-primary" /> Body Measurements (cm)
              </CardTitle>
              <CardDescription>Enter your details for custom tailoring. Use a soft tape measure for accuracy.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="label">Profile Label</Label>
                <Input 
                  id="label" 
                  value={formData.label} 
                  onChange={(e) => setFormData({...formData, label: e.target.value})}
                  placeholder="e.g. Current Measurements, Spring 2024" 
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="chest">Chest</Label>
                  <Input 
                    id="chest" 
                    type="number" 
                    value={formData.chestCircumferenceCm}
                    onChange={(e) => setFormData({...formData, chestCircumferenceCm: e.target.value})}
                    placeholder="88" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="waist">Waist</Label>
                  <Input 
                    id="waist" 
                    type="number" 
                    value={formData.waistCircumferenceCm}
                    onChange={(e) => setFormData({...formData, waistCircumferenceCm: e.target.value})}
                    placeholder="72" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip</Label>
                  <Input 
                    id="hip" 
                    type="number" 
                    value={formData.hipCircumferenceCm}
                    onChange={(e) => setFormData({...formData, hipCircumferenceCm: e.target.value})}
                    placeholder="94" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="shoulder">Shoulder Width</Label>
                  <Input 
                    id="shoulder" 
                    type="number" 
                    value={formData.shoulderWidthCm}
                    onChange={(e) => setFormData({...formData, shoulderWidthCm: e.target.value})}
                    placeholder="38" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sleeve">Sleeve Length</Label>
                  <Input 
                    id="sleeve" 
                    type="number" 
                    value={formData.sleeveLengthCm}
                    onChange={(e) => setFormData({...formData, sleeveLengthCm: e.target.value})}
                    placeholder="55" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dress">Dress Length</Label>
                  <Input 
                    id="dress" 
                    type="number" 
                    value={formData.dressLengthCm}
                    onChange={(e) => setFormData({...formData, dressLengthCm: e.target.value})}
                    placeholder="110" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Textarea 
                  id="notes" 
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="e.g. Prefer relaxed fit around shoulders, extra length for heels..." 
                  rows={4}
                />
              </div>

              <Button 
                onClick={handleSave} 
                disabled={saving}
                className="w-full bg-primary hover:bg-primary/90 rounded-full py-6 uppercase tracking-widest text-xs font-bold"
              >
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                Save Bespoke Profile
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="border-none shadow-lg bg-secondary/10">
            <CardHeader>
              <CardTitle className="font-headline text-2xl flex items-center gap-2">
                <History className="h-5 w-5 text-primary" /> Profile History
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {isHistoryLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : history && history.length > 0 ? (
                history.map((record) => (
                  <div key={record.id} className="p-4 bg-background rounded-lg border flex justify-between items-center group hover:border-primary transition-colors">
                    <div>
                      <p className="font-bold">{record.label}</p>
                      <p className="text-xs text-muted-foreground">{format(new Date(record.measurementDate), 'PPP')}</p>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setFormData({
                      label: record.label,
                      chestCircumferenceCm: String(record.chestCircumferenceCm),
                      waistCircumferenceCm: String(record.waistCircumferenceCm),
                      hipCircumferenceCm: String(record.hipCircumferenceCm),
                      shoulderWidthCm: String(record.shoulderWidthCm),
                      sleeveLengthCm: String(record.sleeveLengthCm),
                      dressLengthCm: String(record.dressLengthCm),
                      notes: record.notes
                    })}>
                      <ChevronRight className="h-4 w-4 group-hover:text-primary" />
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground text-center py-8">No measurement history found.</p>
              )}
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-primary text-white">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                <h4 className="font-bold">Tailoring Promise</h4>
              </div>
              <p className="text-sm opacity-90 leading-relaxed">
                Your measurements are used exclusively by our master tailors at the Bhopal studio to ensure every piece you order fits perfectly.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
