export interface CitationData {
  id: string;
  type: 'case' | 'statute' | 'article' | 'record';
  source: string;
  title: string;
  snippet: string;
  footnoteNumber?: number; // Optional footnote number for scroll-to functionality
}

export interface HistoryEvent {
  id: string;
  user: string;
  action: 'edited' | 'commented' | 'viewed' | 'created';
  description: string;
  timestamp: string;
  avatarColor?: string;
  editId?: string; // ID of the edit element in the document (for scrolling)
  originalText?: string; // Original text that was changed
  revisedText?: string; // Revised text after change
}

export const FILE_CITATIONS: Record<string, CitationData[]> = {
  "Motion to Dismiss - Personal Jurisdiction": [
    {
      id: "cit-pj1",
      type: "case",
      source: "2d Cir.",
      title: "Licci ex rel. Licci v. Lebanese Canadian Bank, SAL",
      snippet: "Held that federal courts in diversity cases apply the forum state's long-arm statute and the Due Process Clause."
    },
    {
      id: "cit-pj2",
      type: "case",
      source: "2d Cir.",
      title: "Chloé v. Queen Bee of Beverly Hills, LLC",
      snippet: "Reaffirmed that New York's long-arm statute is coextensive with federal due process requirements."
    },
    {
      id: "cit-pj3",
      type: "case",
      source: "U.S. Supreme Court",
      title: "International Shoe Co. v. Washington",
      snippet: "Established the minimum contacts test for personal jurisdiction under the Due Process Clause."
    },
    {
      id: "cit-pj4",
      type: "case",
      source: "2d Cir.",
      title: "In re Terrorist Attacks on Sept. 11, 2001",
      snippet: "Clarified that the plaintiff bears the burden of proving the court has jurisdiction over the defendant."
    },
    {
      id: "cit-pj5",
      type: "case",
      source: "U.S. Supreme Court",
      title: "Daimler AG v. Bauman",
      snippet: "Held that general jurisdiction is limited to places where the defendant is 'essentially at home'—typically the defendant's place of incorporation and principal place of business."
    },
    {
      id: "cit-pj6",
      type: "case",
      source: "U.S. Supreme Court",
      title: "Goodyear Dunlop Tires Operations, S.A. v. Brown",
      snippet: "Established that for a corporation, being 'at home' typically means the place of incorporation and principal place of business."
    },
    {
      id: "cit-pj7",
      type: "case",
      source: "2d Cir.",
      title: "Metropolitan Life Ins. Co. v. Robertson-Ceco Corp.",
      snippet: "Set forth the three-part test for specific personal jurisdiction in the Second Circuit."
    },
    {
      id: "cit-pj8",
      type: "case",
      source: "U.S. Supreme Court",
      title: "World-Wide Volkswagen Corp. v. Woodson",
      snippet: "Held that the defendant must have 'purposefully directed' activities toward the forum state and should 'reasonably anticipate being haled into court there.'"
    },
    {
      id: "cit-pj9",
      type: "case",
      source: "U.S. Supreme Court",
      title: "Burger King Corp. v. Rudzewicz",
      snippet: "Held that personal jurisdiction requires the defendant's own actions, not the unilateral activity of the plaintiff or third parties."
    },
    {
      id: "cit-pj10",
      type: "case",
      source: "2d Cir.",
      title: "Sunward Electronics, Inc. v. McDonald",
      snippet: "Reaffirmed that the plaintiff cannot create personal jurisdiction over the defendant by its own unilateral contacts."
    },
    {
      id: "cit-pj11",
      type: "case",
      source: "2d Cir.",
      title: "Waldman v. Palestine Liberation Org.",
      snippet: "Held that a defendant's minimal and incidental contacts with the forum state are insufficient to establish purposeful availment."
    },
    {
      id: "cit-pj12",
      type: "case",
      source: "U.S. Supreme Court",
      title: "Carnival Cruise Lines, Inc. v. Shute",
      snippet: "Held that forum selection clauses are presumptively valid and demonstrate the parties' expectations regarding where disputes will be litigated."
    },
    {
      id: "cit-pj13",
      type: "case",
      source: "2d Cir.",
      title: "PDK Labs, Inc. v. Friedlander",
      snippet: "Set forth the five factors for assessing the reasonableness of exercising personal jurisdiction."
    },
    {
      id: "cit-pj14",
      type: "case",
      source: "2d Cir.",
      title: "Asahi Metal Indus. Co. v. Superior Court",
      snippet: "Held that the burden on the defendant is a significant factor in determining whether the exercise of jurisdiction is reasonable."
    }
  ],
  "Motion to Dismiss": [
    {
      id: "cit-1",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc.",
      snippet: 'Held that "a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract" absent personal injury or property damage.'
    },
    {
      id: "cit-2",
      type: "case",
      source: "2d Cir.",
      title: "Bellevue South Assocs. v. HRH Constr. Corp.",
      snippet: 'Reaffirming that the economic loss rule prevents recovery in tort for economic damages resulting from a breach of contract.'
    },
    {
      id: "cit-3",
      type: "case",
      source: "2d Cir.",
      title: "Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc.",
      snippet: "Established that a fraud claim cannot be maintained when the only fraud alleged is that the defendant entered into a contract with no intention of performing it."
    },
    {
      id: "cit-4",
      type: "case",
      source: "S.D.N.Y.",
      title: "Telecom Int'l Am., Ltd. v. AT&T Corp.",
      snippet: "Held that a plaintiff must allege a legal duty separate from the duty to perform under the contract to maintain a fraud claim."
    },
    {
      id: "cit-5",
      type: "statute",
      source: "FRCP",
      title: "Federal Rule of Civil Procedure 9(b)",
      snippet: 'Requires a party alleging fraud to "state with particularity the circumstances constituting fraud or mistake."'
    },
    {
      id: "cit-6",
      type: "case",
      source: "2d Cir.",
      title: "Mills v. Polar Molecular Corp.",
      snippet: "Clarified the requirements for pleading fraud with particularity under Rule 9(b)."
    },
    {
      id: "cit-7",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "J.A.O. Acquisition Corp. v. Stavitsky",
      snippet: "Held that a negligent misrepresentation claim requires a special or privity-like relationship imposing a duty on the defendant to impart correct information."
    },
    {
      id: "cit-8",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "Rocanova v. Equitable Life Assur. Soc'y",
      snippet: "Established the four-part test for punitive damages in contract actions."
    }
  ],
  "Motion to Dismiss.docx": [
    {
      id: "cit-1",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "532 Madison Ave. Gourmet Foods, Inc. v. Finlandia Ctr., Inc.",
      snippet: 'Held that "a plaintiff cannot recover in tort for purely economic losses resulting from a breach of contract" absent personal injury or property damage.'
    },
    {
      id: "cit-2",
      type: "case",
      source: "2d Cir.",
      title: "Bellevue South Assocs. v. HRH Constr. Corp.",
      snippet: 'Reaffirming that the economic loss rule prevents recovery in tort for economic damages resulting from a breach of contract.'
    },
    {
      id: "cit-3",
      type: "case",
      source: "2d Cir.",
      title: "Bridgestone/Firestone, Inc. v. Recovery Credit Servs., Inc.",
      snippet: "Established that a fraud claim cannot be maintained when the only fraud alleged is that the defendant entered into a contract with no intention of performing it."
    },
    {
      id: "cit-4",
      type: "case",
      source: "S.D.N.Y.",
      title: "Telecom Int'l Am., Ltd. v. AT&T Corp.",
      snippet: "Held that a plaintiff must allege a legal duty separate from the duty to perform under the contract to maintain a fraud claim."
    },
    {
      id: "cit-5",
      type: "statute",
      source: "FRCP",
      title: "Federal Rule of Civil Procedure 9(b)",
      snippet: 'Requires a party alleging fraud to "state with particularity the circumstances constituting fraud or mistake."'
    },
    {
      id: "cit-6",
      type: "case",
      source: "2d Cir.",
      title: "Mills v. Polar Molecular Corp.",
      snippet: "Clarified the requirements for pleading fraud with particularity under Rule 9(b)."
    },
    {
      id: "cit-7",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "J.A.O. Acquisition Corp. v. Stavitsky",
      snippet: "Held that a negligent misrepresentation claim requires a special or privity-like relationship imposing a duty on the defendant to impart correct information."
    },
    {
      id: "cit-8",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "Rocanova v. Equitable Life Assur. Soc'y",
      snippet: "Established the four-part test for punitive damages in contract actions."
    }
  ],
  "New York Freedom of Speech": [
    {
      id: "cit-ny1",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "Immuno AG. v. Moor-Jankowski",
      snippet: "Noting that the state constitution's free speech provision is often interpreted more broadly than the First Amendment, particularly in libel cases."
    },
    {
      id: "cit-ny2",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "O'Neill v. Oakgrove Constr., Inc.",
      snippet: "Discussing the strong presumption against prior restraints under the New York Constitution."
    }
  ],
  "Complaint.docx": [
    {
      id: "cit-c1",
      type: "statute",
      source: "28 U.S.C. § 1332",
      title: "Diversity of Citizenship",
      snippet: "The district courts shall have original jurisdiction of all civil actions where the matter in controversy exceeds the sum or value of $75,000... and is between citizens of different States."
    },
    {
      id: "cit-c2",
      type: "statute",
      source: "N.Y. Gen. Bus. Law § 349",
      title: "Deceptive Acts and Practices",
      snippet: "Deceptive acts or practices in the conduct of any business, trade or commerce or in the furnishing of any service in this state are hereby declared unlawful."
    }
  ],
  "Strategy.docx": [
    {
      id: "cit-s1",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "W.W.W. Assocs., Inc. v. Giancontieri",
      snippet: "Held that when parties set down their agreement in a clear, complete document, their writing should be enforced according to its terms."
    },
    {
      id: "cit-s2",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "Lama Holding Co. v. Smith Barney Inc.",
      snippet: "Established the elements of fraud: misrepresentation, falsity, scienter, reliance, and injury."
    },
    {
      id: "cit-s3",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "Gilbert Frank Corp. v. Fed. Ins. Co.",
      snippet: "Held that waiver is an intentional relinquishment of a known right and should not be lightly presumed."
    },
    {
      id: "cit-s4",
      type: "case",
      source: "N.Y. Ct. App.",
      title: "New York Univ. v. Cont'l Ins. Co.",
      snippet: "Discussing the economic loss rule and the need for a separate legal duty independent of the contract."
    }
  ]
};

export const FILE_HISTORY: Record<string, HistoryEvent[]> = {
  "Motion to Dismiss - Personal Jurisdiction": [
    {
      id: "h1",
      user: "CoCounsel",
      action: "created",
      description: "Drafted motion to dismiss based on lack of personal jurisdiction",
      timestamp: "Just now",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Motion to Dismiss": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Revised the Argument section to include the Economic Loss Rule",
      timestamp: "Oct 12, 2:45 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Added a note about the punitive damages claim",
      timestamp: "Oct 12, 11:30 AM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Formatted citations and updated the Table of Authorities",
      timestamp: "Oct 11, 4:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "CoCounsel",
      action: "created",
      description: "Drafted initial version based on Complaint and Case Law",
      timestamp: "Oct 11, 9:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Motion to Dismiss.docx": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Revised the Argument section to include the Economic Loss Rule",
      timestamp: "Oct 12, 2:45 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Added a note about the punitive damages claim",
      timestamp: "Oct 12, 11:30 AM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Formatted citations and updated the Table of Authorities",
      timestamp: "Oct 11, 4:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "CoCounsel",
      action: "created",
      description: "Drafted initial version based on Complaint and Case Law",
      timestamp: "Oct 11, 9:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Motion to Dismiss Draft": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Updated conclusion to strengthen relief requested",
      timestamp: "3:45 PM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "commented",
      description: "Suggested revisions to standing argument",
      timestamp: "2:20 PM, Feb 25, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Refined argument on statute of limitations",
      timestamp: "11:15 AM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "Rachel Martinez",
      action: "viewed",
      description: "Reviewed draft before client meeting",
      timestamp: "4:30 PM, Feb 24, 2026",
      avatarColor: "bg-teal-600"
    },
    {
      id: "h5",
      user: "CoCounsel",
      action: "edited",
      description: "Added supporting case citations to Section III",
      timestamp: "2:10 PM, Feb 24, 2026",
      avatarColor: "bg-[#de6633]"
    },
    {
      id: "h6",
      user: "Michael Ross",
      action: "edited",
      description: "Corrected formatting in Table of Contents",
      timestamp: "10:05 AM, Feb 24, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h7",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Expanded factual background section",
      timestamp: "3:50 PM, Feb 23, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h8",
      user: "CoCounsel",
      action: "created",
      description: "Drafted initial version based on Complaint and Case Law",
      timestamp: "9:00 AM, Feb 23, 2026",
      avatarColor: "bg-[#de6633]"
    }
  ],
  "New York Freedom of Speech": [
    {
      id: "h1",
      user: "CoCounsel",
      action: "created",
      description: "Completed research on NY Freedom of Speech",
      timestamp: "Oct 10, 2:15 PM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Complaint.docx": [
    {
      id: "h1",
      user: "Robert Counsel",
      action: "edited",
      description: "Finalized factual allegations regarding the concrete substitution",
      timestamp: "Sep 28, 5:30 PM",
      avatarColor: "bg-gray-700"
    },
    {
      id: "h2",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Added Count V for GBL § 349 violation",
      timestamp: "Sep 28, 2:15 PM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h3",
      user: "CoCounsel",
      action: "created",
      description: "Generated draft based on client intake notes",
      timestamp: "Sep 27, 10:00 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Strategy.docx": [
    {
      id: "h1",
      user: "Sarah Jenkins",
      action: "edited",
      description: "Updated settlement target based on new expert estimates",
      timestamp: "Oct 15, 10:30 AM",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h2",
      user: "Michael Ross",
      action: "viewed",
      description: "Reviewed discovery plan",
      timestamp: "Oct 14, 3:45 PM",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h3",
      user: "CoCounsel",
      action: "created",
      description: "Drafted strategy memo based on current case files",
      timestamp: "Oct 14, 9:15 AM",
      avatarColor: "bg-[#1D4B34]"
    }
  ],
  "Discovery overview": [
    {
      id: "h1",
      user: "Sarah Chen",
      action: "commented",
      description: "Added comment on interrogatory responses needing more specificity",
      timestamp: "2:15 PM, Feb 25, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h2",
      user: "Michael Torres",
      action: "edited",
      description: "Updated Status column for Email_Batch_003.pst to 'Privilege Review Required'",
      timestamp: "11:30 AM, Feb 25, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h3",
      user: "Jessica Park",
      action: "edited",
      description: "Added 5 new document rows from recent production",
      timestamp: "9:45 AM, Feb 25, 2026",
      avatarColor: "bg-purple-600"
    },
    {
      id: "h4",
      user: "David Kumar",
      action: "commented",
      description: "Flagged concern about native file format request from opposing counsel",
      timestamp: "4:20 PM, Feb 24, 2026",
      avatarColor: "bg-blue-600"
    },
    {
      id: "h5",
      user: "CoCounsel",
      action: "edited",
      description: "Auto-populated Custodian field for 12 documents based on metadata",
      timestamp: "2:00 PM, Feb 24, 2026",
      avatarColor: "bg-[#de6633]"
    },
    {
      id: "h6",
      user: "Emily Rodriguez",
      action: "commented",
      description: "Updated privilege log with 47 additional attorney-client communications",
      timestamp: "11:15 AM, Feb 24, 2026",
      avatarColor: "bg-teal-600"
    },
    {
      id: "h7",
      user: "Michael Torres",
      action: "edited",
      description: "Added custom question 'Litigation Hold Status?' to analysis columns",
      timestamp: "10:30 AM, Feb 24, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h8",
      user: "Sarah Chen",
      action: "edited",
      description: "Uploaded 23 files from client production folder",
      timestamp: "3:15 PM, Feb 23, 2026",
      avatarColor: "bg-[#1D4B34]"
    },
    {
      id: "h9",
      user: "CoCounsel",
      action: "created",
      description: "Created discovery overview table with initial document set",
      timestamp: "9:00 AM, Feb 23, 2026",
      avatarColor: "bg-[#de6633]"
    }
  ]
};