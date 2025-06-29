import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, FileText, Check, AlertCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface DocumentUploadFormProps {
  formData: {
    idProofs: File[];
    educationalCertificates: File[];
    medicalLicense: File | null;
    employmentContract: File | null;
    otherDocuments: File[];
  };
  updateFormData: (data: any) => void;
  markSectionComplete: (isComplete: boolean) => void;
}

interface FileWithPreview extends File {
  preview?: string;
  id: string;
}

const DocumentUploadForm: React.FC<DocumentUploadFormProps> = ({
  formData,
  updateFormData,
  markSectionComplete
}) => {
  const [idProofs, setIdProofs] = useState<FileWithPreview[]>([]);
  const [educationalCerts, setEducationalCerts] = useState<FileWithPreview[]>([]);
  const [medicalLicense, setMedicalLicense] = useState<FileWithPreview | null>(null);
  const [employmentContract, setEmploymentContract] = useState<FileWithPreview | null>(null);
  const [otherDocs, setOtherDocs] = useState<FileWithPreview[]>([]);
  
  // Initialize file previews from formData
  useEffect(() => {
    // ID Proofs
    if (formData.idProofs.length > 0 && idProofs.length === 0) {
      const withPreviews = formData.idProofs.map(file => ({
        ...file,
        id: generateId()
      }));
      setIdProofs(withPreviews as FileWithPreview[]);
    }
    
    // Educational Certificates
    if (formData.educationalCertificates.length > 0 && educationalCerts.length === 0) {
      const withPreviews = formData.educationalCertificates.map(file => ({
        ...file,
        id: generateId()
      }));
      setEducationalCerts(withPreviews as FileWithPreview[]);
    }
    
    // Medical License
    if (formData.medicalLicense && !medicalLicense) {
      setMedicalLicense({
        ...formData.medicalLicense,
        id: generateId()
      } as FileWithPreview);
    }
    
    // Employment Contract
    if (formData.employmentContract && !employmentContract) {
      setEmploymentContract({
        ...formData.employmentContract,
        id: generateId()
      } as FileWithPreview);
    }
    
    // Other Documents
    if (formData.otherDocuments.length > 0 && otherDocs.length === 0) {
      const withPreviews = formData.otherDocuments.map(file => ({
        ...file,
        id: generateId()
      }));
      setOtherDocs(withPreviews as FileWithPreview[]);
    }
  }, [formData]);
  
  // Check if form is complete
  useEffect(() => {
    // At least one ID proof is required
    const isComplete = idProofs.length > 0;
    markSectionComplete(isComplete);
  }, [idProofs, markSectionComplete]);
  
  // Generate unique ID for files
  const generateId = () => {
    return Math.random().toString(36).substring(2, 15);
  };
  
  // Handle file upload for ID proofs
  const handleIdProofUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        ...file,
        id: generateId()
      }));
      
      const updatedFiles = [...idProofs, ...newFiles];
      setIdProofs(updatedFiles);
      updateFormData({ idProofs: updatedFiles });
    }
  };
  
  // Handle file upload for educational certificates
  const handleEducationalCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        ...file,
        id: generateId()
      }));
      
      const updatedFiles = [...educationalCerts, ...newFiles];
      setEducationalCerts(updatedFiles);
      updateFormData({ educationalCertificates: updatedFiles });
    }
  };
  
  // Handle file upload for medical license
  const handleMedicalLicenseUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = {
        ...e.target.files[0],
        id: generateId()
      };
      setMedicalLicense(file);
      updateFormData({ medicalLicense: file });
    }
  };
  
  // Handle file upload for employment contract
  const handleEmploymentContractUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = {
        ...e.target.files[0],
        id: generateId()
      };
      setEmploymentContract(file);
      updateFormData({ employmentContract: file });
    }
  };
  
  // Handle file upload for other documents
  const handleOtherDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files).map(file => ({
        ...file,
        id: generateId()
      }));
      
      const updatedFiles = [...otherDocs, ...newFiles];
      setOtherDocs(updatedFiles);
      updateFormData({ otherDocuments: updatedFiles });
    }
  };
  
  // Remove file from ID proofs
  const removeIdProof = (id: string) => {
    const updatedFiles = idProofs.filter(file => file.id !== id);
    setIdProofs(updatedFiles);
    updateFormData({ idProofs: updatedFiles });
  };
  
  // Remove file from educational certificates
  const removeEducationalCert = (id: string) => {
    const updatedFiles = educationalCerts.filter(file => file.id !== id);
    setEducationalCerts(updatedFiles);
    updateFormData({ educationalCertificates: updatedFiles });
  };
  
  // Remove medical license
  const removeMedicalLicense = () => {
    setMedicalLicense(null);
    updateFormData({ medicalLicense: null });
  };
  
  // Remove employment contract
  const removeEmploymentContract = () => {
    setEmploymentContract(null);
    updateFormData({ employmentContract: null });
  };
  
  // Remove file from other documents
  const removeOtherDoc = (id: string) => {
    const updatedFiles = otherDocs.filter(file => file.id !== id);
    setOtherDocs(updatedFiles);
    updateFormData({ otherDocuments: updatedFiles });
  };
  
  // Get file size in readable format
  const getFileSize = (size: number) => {
    if (size < 1024) {
      return size + ' bytes';
    } else if (size < 1024 * 1024) {
      return (size / 1024).toFixed(2) + ' KB';
    } else {
      return (size / (1024 * 1024)).toFixed(2) + ' MB';
    }
  };
  
  // Render file item
  const renderFileItem = (file: FileWithPreview, onRemove: () => void) => {
    return (
      <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md mb-2">
        <div className="flex items-center">
          <div className="bg-blue-100 p-2 rounded-md mr-3">
            <FileText className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">{file.name}</p>
            <p className="text-xs text-gray-500">{getFileSize(file.size)}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={onRemove}>
          <X className="h-4 w-4 text-gray-500" />
        </Button>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="text-xl font-semibold text-gray-800 mb-4">Document Upload</div>
      
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Please upload clear, legible scans or photos of all documents. Accepted formats: PDF, JPG, PNG (Max 5MB per file)
        </AlertDescription>
      </Alert>
      
      {/* ID Proofs */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">ID Proofs <span className="text-red-500">*</span></h3>
            <div className="flex items-center">
              <Check className={`h-4 w-4 mr-1 ${idProofs.length > 0 ? 'text-green-500' : 'text-gray-300'}`} />
              <span className={`text-sm ${idProofs.length > 0 ? 'text-green-500' : 'text-gray-500'}`}>
                {idProofs.length > 0 ? 'Required documents uploaded' : 'Required'}
              </span>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 mb-4">
            Upload government-issued ID proofs (Aadhar Card, PAN Card, Voter ID, Passport, etc.)
          </p>
          
          {/* File list */}
          <div className="mb-4">
            {idProofs.map(file => renderFileItem(file, () => removeIdProof(file.id)))}
          </div>
          
          {/* Upload button */}
          <div className="flex justify-center">
            <label htmlFor="id-proof-upload" className="cursor-pointer">
              <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="id-proof-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload ID proofs</span>
                      <input 
                        id="id-proof-upload" 
                        name="id-proof-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleIdProofUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                </div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>
      
      {/* Educational Certificates */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Educational Certificates</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload educational qualifications (Degrees, Diplomas, Certifications)
          </p>
          
          {/* File list */}
          <div className="mb-4">
            {educationalCerts.map(file => renderFileItem(file, () => removeEducationalCert(file.id)))}
          </div>
          
          {/* Upload button */}
          <div className="flex justify-center">
            <label htmlFor="edu-cert-upload" className="cursor-pointer">
              <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="edu-cert-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload certificates</span>
                      <input 
                        id="edu-cert-upload" 
                        name="edu-cert-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleEducationalCertUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                </div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>
      
      {/* Medical License */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Medical License (for doctors)</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload medical practice license or registration certificate
          </p>
          
          {/* File display */}
          <div className="mb-4">
            {medicalLicense && renderFileItem(medicalLicense, removeMedicalLicense)}
          </div>
          
          {/* Upload button */}
          {!medicalLicense && (
            <div className="flex justify-center">
              <label htmlFor="medical-license-upload" className="cursor-pointer">
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor="medical-license-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload license</span>
                        <input 
                          id="medical-license-upload" 
                          name="medical-license-upload" 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleMedicalLicenseUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </label>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Employment Contract */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Employment Contract</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload signed employment contract or offer letter
          </p>
          
          {/* File display */}
          <div className="mb-4">
            {employmentContract && renderFileItem(employmentContract, removeEmploymentContract)}
          </div>
          
          {/* Upload button */}
          {!employmentContract && (
            <div className="flex justify-center">
              <label htmlFor="contract-upload" className="cursor-pointer">
                <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <div className="text-sm text-gray-600">
                      <label htmlFor="contract-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                        <span>Upload contract</span>
                        <input 
                          id="contract-upload" 
                          name="contract-upload" 
                          type="file" 
                          className="sr-only" 
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={handleEmploymentContractUpload}
                        />
                      </label>
                    </div>
                    <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                  </div>
                </div>
              </label>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Other Documents */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">Other Documents</h3>
          <p className="text-sm text-gray-500 mb-4">
            Upload any additional relevant documents
          </p>
          
          {/* File list */}
          <div className="mb-4">
            {otherDocs.map(file => renderFileItem(file, () => removeOtherDoc(file.id)))}
          </div>
          
          {/* Upload button */}
          <div className="flex justify-center">
            <label htmlFor="other-docs-upload" className="cursor-pointer">
              <div className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-50">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <label htmlFor="other-docs-upload" className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                      <span>Upload documents</span>
                      <input 
                        id="other-docs-upload" 
                        name="other-docs-upload" 
                        type="file" 
                        className="sr-only" 
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleOtherDocUpload}
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PDF, JPG, PNG up to 5MB</p>
                </div>
              </div>
            </label>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentUploadForm;
