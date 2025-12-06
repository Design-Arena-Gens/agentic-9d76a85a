'use client'

import { useState } from 'react'
import { ClipboardList, UserPlus, Calendar, Heart, Activity, AlertCircle, CheckCircle, ArrowRight } from 'lucide-react'

type Step = 'welcome' | 'check-in-type' | 'patient-info' | 'symptoms' | 'appointment' | 'confirmation'

interface PatientInfo {
  firstName: string
  lastName: string
  dateOfBirth: string
  phone: string
  email: string
}

interface SymptomData {
  mainSymptom: string
  duration: string
  severity: string
  additionalSymptoms: string[]
}

export default function Home() {
  const [step, setStep] = useState<Step>('welcome')
  const [checkInType, setCheckInType] = useState<'appointment' | 'walk-in' | ''>('')
  const [patientInfo, setPatientInfo] = useState<PatientInfo>({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    phone: '',
    email: '',
  })
  const [symptoms, setSymptoms] = useState<SymptomData>({
    mainSymptom: '',
    duration: '',
    severity: '',
    additionalSymptoms: [],
  })
  const [appointmentDate, setAppointmentDate] = useState('')
  const [appointmentTime, setAppointmentTime] = useState('')

  const resetKiosk = () => {
    setStep('welcome')
    setCheckInType('')
    setPatientInfo({ firstName: '', lastName: '', dateOfBirth: '', phone: '', email: '' })
    setSymptoms({ mainSymptom: '', duration: '', severity: '', additionalSymptoms: [] })
    setAppointmentDate('')
    setAppointmentTime('')
  }

  const commonSymptoms = [
    'Fever', 'Cough', 'Headache', 'Sore Throat', 'Nausea',
    'Dizziness', 'Shortness of Breath', 'Chest Pain', 'Fatigue'
  ]

  return (
    <main className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-6 px-8 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Activity className="w-10 h-10" />
            <div>
              <h1 className="text-3xl font-bold">HealthCare Medical Center</h1>
              <p className="text-blue-100 text-sm">Self-Service Check-In Kiosk</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-blue-100">Emergency?</p>
            <p className="text-2xl font-bold">Call 911</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-4xl">
          {/* Welcome Screen */}
          {step === 'welcome' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <Heart className="w-24 h-24 text-red-500 mx-auto mb-6" />
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to Our Medical Center</h2>
              <p className="text-xl text-gray-600 mb-12">Please tap the screen to begin your check-in</p>
              <button
                onClick={() => setStep('check-in-type')}
                className="bg-blue-600 hover:bg-blue-700 text-white text-2xl font-semibold py-6 px-16 rounded-xl shadow-lg transition-all transform hover:scale-105"
              >
                Start Check-In
              </button>
              <div className="mt-12 grid grid-cols-3 gap-6 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Quick & Easy</p>
                    <p className="text-sm text-gray-600">Complete check-in in minutes</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Secure</p>
                    <p className="text-sm text-gray-600">Your information is protected</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-gray-800">Contactless</p>
                    <p className="text-sm text-gray-600">Safe and convenient</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Check-In Type Selection */}
          {step === 'check-in-type' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">How can we help you today?</h2>
              <div className="grid grid-cols-2 gap-8">
                <button
                  onClick={() => {
                    setCheckInType('appointment')
                    setStep('patient-info')
                  }}
                  className="bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white p-10 rounded-xl shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-4"
                >
                  <Calendar className="w-20 h-20" />
                  <span className="text-2xl font-semibold">I have an appointment</span>
                  <span className="text-sm opacity-90">Check in for scheduled visit</span>
                </button>
                <button
                  onClick={() => {
                    setCheckInType('walk-in')
                    setStep('patient-info')
                  }}
                  className="bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-10 rounded-xl shadow-lg transition-all transform hover:scale-105 flex flex-col items-center gap-4"
                >
                  <UserPlus className="w-20 h-20" />
                  <span className="text-2xl font-semibold">Walk-in visit</span>
                  <span className="text-sm opacity-90">New or urgent care</span>
                </button>
              </div>
              <button
                onClick={() => setStep('welcome')}
                className="mt-8 text-gray-600 hover:text-gray-800 font-medium w-full text-center py-3"
              >
                ← Back
              </button>
            </div>
          )}

          {/* Patient Information */}
          {step === 'patient-info' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Patient Information</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                setStep('symptoms')
              }} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">First Name *</label>
                    <input
                      type="text"
                      required
                      value={patientInfo.firstName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, firstName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-semibold mb-2">Last Name *</label>
                    <input
                      type="text"
                      required
                      value={patientInfo.lastName}
                      onChange={(e) => setPatientInfo({ ...patientInfo, lastName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={patientInfo.dateOfBirth}
                    onChange={(e) => setPatientInfo({ ...patientInfo, dateOfBirth: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                  <input
                    type="email"
                    value={patientInfo.email}
                    onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                    placeholder="john.doe@example.com"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('check-in-type')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg text-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Symptoms Assessment */}
          {step === 'symptoms' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Symptom Assessment</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                if (checkInType === 'walk-in') {
                  setStep('appointment')
                } else {
                  setStep('confirmation')
                }
              }} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">What is your primary reason for today's visit? *</label>
                  <textarea
                    required
                    value={symptoms.mainSymptom}
                    onChange={(e) => setSymptoms({ ...symptoms, mainSymptom: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg h-24"
                    placeholder="Describe your main symptom or concern..."
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">How long have you had this symptom? *</label>
                  <select
                    required
                    value={symptoms.duration}
                    onChange={(e) => setSymptoms({ ...symptoms, duration: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  >
                    <option value="">Select duration</option>
                    <option value="less-than-24h">Less than 24 hours</option>
                    <option value="1-3-days">1-3 days</option>
                    <option value="4-7-days">4-7 days</option>
                    <option value="1-2-weeks">1-2 weeks</option>
                    <option value="more-than-2-weeks">More than 2 weeks</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Severity level *</label>
                  <div className="grid grid-cols-3 gap-4">
                    {['Mild', 'Moderate', 'Severe'].map((level) => (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSymptoms({ ...symptoms, severity: level })}
                        className={`py-4 px-6 rounded-lg font-semibold text-lg transition-all ${
                          symptoms.severity === level
                            ? level === 'Mild' ? 'bg-green-500 text-white'
                              : level === 'Moderate' ? 'bg-yellow-500 text-white'
                              : 'bg-red-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Additional symptoms (select all that apply)</label>
                  <div className="grid grid-cols-3 gap-3">
                    {commonSymptoms.map((symptom) => (
                      <button
                        key={symptom}
                        type="button"
                        onClick={() => {
                          const newSymptoms = symptoms.additionalSymptoms.includes(symptom)
                            ? symptoms.additionalSymptoms.filter(s => s !== symptom)
                            : [...symptoms.additionalSymptoms, symptom]
                          setSymptoms({ ...symptoms, additionalSymptoms: newSymptoms })
                        }}
                        className={`py-3 px-4 rounded-lg font-medium transition-all ${
                          symptoms.additionalSymptoms.includes(symptom)
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {symptom}
                      </button>
                    ))}
                  </div>
                </div>
                {symptoms.severity === 'Severe' && (
                  <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
                    <div>
                      <p className="text-red-800 font-semibold">Important Notice</p>
                      <p className="text-red-700 text-sm">If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately.</p>
                    </div>
                  </div>
                )}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('patient-info')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg text-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Appointment Scheduling (Walk-in only) */}
          {step === 'appointment' && checkInType === 'walk-in' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12">
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Schedule Your Visit</h2>
              <form onSubmit={(e) => {
                e.preventDefault()
                setStep('confirmation')
              }} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Date *</label>
                  <input
                    type="date"
                    required
                    value={appointmentDate}
                    onChange={(e) => setAppointmentDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none text-lg"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Preferred Time *</label>
                  <div className="grid grid-cols-4 gap-3">
                    {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setAppointmentTime(time)}
                        className={`py-4 rounded-lg font-semibold transition-all ${
                          appointmentTime === time
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-4">
                  <p className="text-blue-800 font-semibold mb-2">Next Available:</p>
                  <p className="text-blue-700">Today at 2:30 PM - Dr. Sarah Johnson</p>
                  <p className="text-blue-700">Tomorrow at 9:00 AM - Dr. Michael Chen</p>
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setStep('symptoms')}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-4 rounded-lg text-lg"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-lg text-lg flex items-center justify-center gap-2"
                  >
                    Confirm Appointment <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Confirmation */}
          {step === 'confirmation' && (
            <div className="bg-white rounded-2xl shadow-2xl p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-16 h-16 text-green-600" />
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Check-In Complete!</h2>
              <p className="text-xl text-gray-600 mb-8">Thank you, {patientInfo.firstName} {patientInfo.lastName}</p>

              <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Visit Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Visit Type:</span>
                    <span className="font-semibold text-gray-800">{checkInType === 'appointment' ? 'Scheduled Appointment' : 'Walk-in Visit'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Date of Birth:</span>
                    <span className="font-semibold text-gray-800">{patientInfo.dateOfBirth}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold text-gray-800">{patientInfo.phone}</span>
                  </div>
                  {checkInType === 'walk-in' && appointmentDate && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Appointment:</span>
                      <span className="font-semibold text-gray-800">{appointmentDate} at {appointmentTime}</span>
                    </div>
                  )}
                  <div className="pt-3 border-t">
                    <span className="text-gray-600">Primary Concern:</span>
                    <p className="font-semibold text-gray-800 mt-1">{symptoms.mainSymptom}</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border-2 border-blue-300 rounded-lg p-6 mb-8">
                <ClipboardList className="w-12 h-12 text-blue-600 mx-auto mb-3" />
                <p className="text-blue-800 font-semibold text-lg">Queue Number: A-42</p>
                <p className="text-blue-700 mt-2">Estimated wait time: 15-20 minutes</p>
                <p className="text-blue-700 text-sm mt-4">Please have a seat in the waiting area. You will be called when the doctor is ready.</p>
              </div>

              <button
                onClick={resetKiosk}
                className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-12 rounded-lg"
              >
                Start New Check-In
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 px-8">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <p className="text-sm">© 2024 HealthCare Medical Center. All rights reserved.</p>
          <div className="flex gap-6 text-sm">
            <button className="hover:text-blue-300">Need Help?</button>
            <button className="hover:text-blue-300">Privacy Policy</button>
            <button className="hover:text-blue-300">Terms of Use</button>
          </div>
        </div>
      </footer>
    </main>
  )
}
