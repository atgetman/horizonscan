import { useState } from 'react';
import { RegulatorySignalCard } from './RegulatorySignalCard';
import { HorizonScanResults } from './HorizonScanResults';
import { AffectedClausesView } from './AffectedClausesView';
import { MonitoringConfirmation } from './MonitoringConfirmation';

interface HorizonChatIntegrationProps {
  mode: 'inline-signal' | 'full-scan' | 'affected-clauses' | 'monitoring-confirmation';
  onNavigate?: (path: string) => void;
}

export function HorizonChatIntegration({ mode, onNavigate }: HorizonChatIntegrationProps) {
  const [view, setView] = useState<'scan' | 'clauses' | 'confirmation'>(mode === 'full-scan' ? 'scan' : 'scan');

  // Inline signal - appears mid-response
  if (mode === 'inline-signal') {
    return (
      <RegulatorySignalCard
        title="SEC Climate Disclosure Rule Amendment"
        impact="high"
        rationale="New materiality thresholds for Scope 3 emissions may require additional disclosures in annual reports and investment memoranda."
        docsAffected={3}
        onMonitor={() => {
          const chatId = Math.random().toString(36).substring(2, 11);
          sessionStorage.setItem(`chat_${chatId}_prompt`, 'Set up monitoring for SEC Climate Disclosure Rule');
          sessionStorage.setItem(`chat_${chatId}_monitoring`, 'true');
          if (onNavigate) {
            onNavigate(`/chat/${chatId}`);
          }
        }}
      />
    );
  }

  // Full scan results
  if (mode === 'full-scan' && view === 'scan') {
    return (
      <HorizonScanResults
        steps={[
          { label: 'Scanning federal regulations', completed: true },
          { label: 'Scanning state regulations', completed: true },
          { label: 'Checking workspace documents', completed: true },
          { label: 'Analyzing impact', completed: true },
        ]}
        results={[
          {
            id: '1',
            regulation: 'SEC Climate Disclosure Rule Amendment',
            impact: 'high',
            rationale:
              'New materiality thresholds for Scope 3 emissions may require additional disclosures in annual reports and investment memoranda for funds with ESG mandates.',
            docsAffected: 3,
            jurisdiction: 'Federal (SEC)',
            effectiveDate: 'Jan 2027',
          },
          {
            id: '2',
            regulation: 'California Privacy Rights Act (CPRA) Update',
            impact: 'high',
            rationale:
              'Expanded definition of "sensitive personal information" now includes union membership and precise geolocation. Existing vendor agreements may lack required opt-out mechanisms.',
            docsAffected: 5,
            jurisdiction: 'California',
            effectiveDate: 'Jul 2026',
          },
          {
            id: '3',
            regulation: 'FTC Non-Compete Clause Ban',
            impact: 'medium',
            rationale:
              'Proposed rule invalidates most non-compete agreements. Employment contracts and M&A purchase agreements with non-compete provisions will need restructuring.',
            docsAffected: 12,
            jurisdiction: 'Federal (FTC)',
            effectiveDate: 'Sep 2026',
          },
        ]}
        onViewDocs={(resultId) => setView('clauses')}
        onCreateMonitor={(resultId) => setView('confirmation')}
      />
    );
  }

  // Affected clauses drill-down
  if (mode === 'full-scan' && view === 'clauses') {
    return (
      <AffectedClausesView
        regulationTitle="SEC Climate Disclosure Rule Amendment"
        documents={[
          {
            id: 'doc1',
            title: 'Series B Investment Agreement - Acme Ventures',
            clauses: [
              {
                id: 'clause1',
                reference: 'Section 4.2(b)',
                impact: 'high',
                originalText:
                  'The Company shall provide annual sustainability reports to investors upon request, including reasonable information regarding environmental impact.',
                suggestedText:
                  'The Company shall provide annual sustainability reports to investors upon request, including disclosure of Scope 1, Scope 2, and material Scope 3 greenhouse gas emissions calculated in accordance with SEC Climate Disclosure Rule requirements.',
                rationale:
                  'Current language does not meet new SEC materiality thresholds for climate-related disclosures.',
              },
              {
                id: 'clause2',
                reference: 'Section 7.1(a)',
                impact: 'medium',
                originalText:
                  'The Company represents that it is in compliance with all applicable environmental laws and regulations.',
                suggestedText:
                  'The Company represents that it is in compliance with all applicable environmental laws and regulations, including disclosure obligations under the SEC Climate Disclosure Rule as amended effective January 2027.',
                rationale:
                  'Representation should explicitly reference new SEC requirements to avoid ambiguity.',
              },
            ],
          },
          {
            id: 'doc2',
            title: 'Annual Report Template FY2026',
            clauses: [
              {
                id: 'clause3',
                reference: 'Part III - Environmental Matters',
                impact: 'high',
                originalText:
                  'The Company monitors environmental risks and has implemented policies to minimize carbon footprint where feasible.',
                suggestedText:
                  'The Company monitors environmental risks and reports material Scope 3 emissions. For FY2026, total Scope 3 emissions were [X] metric tons CO2e, calculated using [methodology]. Material categories include [list categories].',
                rationale:
                  'Generic environmental statement must be replaced with specific quantitative disclosure.',
              },
            ],
          },
        ]}
      />
    );
  }

  // Monitoring confirmation
  if (mode === 'monitoring-confirmation' || view === 'confirmation') {
    return (
      <MonitoringConfirmation
        monitors={[
          {
            id: 'm1',
            title: 'SEC Climate Disclosure Rule',
            topics: ['ESG', 'Climate Reporting', 'Investment Agreements'],
            jurisdiction: 'Federal (SEC)',
            frequency: 'weekly',
          },
        ]}
        onManageInKnowledge={() => {
          if (onNavigate) {
            onNavigate('/knowledge');
          }
        }}
      />
    );
  }

  return null;
}