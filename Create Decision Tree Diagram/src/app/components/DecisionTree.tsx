import { useState } from 'react';
import { CheckCircle2, Circle, ChevronDown, ChevronRight, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

interface DecisionNodeProps {
  question: string;
  yesPath?: React.ReactNode;
  noPath?: React.ReactNode;
  level?: number;
  nodeId: string;
  expandedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
}

interface ResultNodeProps {
  method: string;
  subtitle: string;
  description: string;
  level?: number;
  nodeId: string;
  expandedNodes: Set<string>;
  onToggle: (nodeId: string) => void;
}

const ResultNode = ({ method, subtitle, description, level = 0, nodeId, expandedNodes, onToggle }: ResultNodeProps) => {
  const isExpanded = expandedNodes.has(nodeId);
  
  return (
    <div className="relative">
      {level > 0 && (
        <>
          {/* Vertical connector line */}
          <div className="absolute left-0 top-0 w-px h-6 bg-gradient-to-b from-gray-300 to-transparent -translate-y-6" />
          {/* Horizontal connector line */}
          <div className="absolute left-0 top-0 w-8 h-px bg-gray-300 -translate-y-6" />
        </>
      )}
      <Card 
        className={`bg-gradient-to-br from-green-50 to-emerald-50 border-green-300 shadow-md cursor-pointer transition-all hover:shadow-lg ${level > 0 ? 'ml-8' : ''}`}
        onClick={() => onToggle(nodeId)}
      >
        <CardHeader>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <Badge className="bg-green-600 hover:bg-green-700 mb-2">Recommended</Badge>
                  <CardTitle className="text-xl text-green-900">{method}</CardTitle>
                  <p className="text-sm text-green-700 mt-1 italic">{subtitle}</p>
                </div>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-green-700 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-green-700 flex-shrink-0" />
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <p className="text-gray-700">{description}</p>
          </CardContent>
        )}
      </Card>
    </div>
  );
};

const DecisionNode = ({ question, yesPath, noPath, level = 0, nodeId, expandedNodes, onToggle }: DecisionNodeProps) => {
  const isExpanded = expandedNodes.has(nodeId);
  
  return (
    <div className={`space-y-6 ${level > 0 ? 'ml-8' : ''}`}>
      <div className="relative">
        {level > 0 && (
          <>
            {/* Vertical connector line */}
            <div className="absolute left-0 top-0 w-px h-6 bg-gradient-to-b from-blue-400 to-transparent -translate-y-6" />
            {/* Horizontal connector line */}
            <div className="absolute left-0 top-0 w-8 h-px bg-blue-400 -translate-y-6" />
          </>
        )}
        <Card 
          className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-300 shadow-md cursor-pointer transition-all hover:shadow-lg"
          onClick={() => onToggle(nodeId)}
        >
          <CardHeader>
            <div className="flex items-start gap-3">
              <Circle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
              <div className="flex-1 flex items-start justify-between gap-3">
                <CardTitle className="text-lg text-blue-900">{question}</CardTitle>
                {isExpanded ? (
                  <ChevronDown className="w-5 h-5 text-blue-700 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-blue-700 flex-shrink-0" />
                )}
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>

      {isExpanded && (
        <>
          {yesPath && (
            <div className="relative">
              {/* Vertical line from question to YES branch */}
              <div className="absolute left-4 top-0 w-px h-6 bg-blue-300" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 relative">
                  {/* Horizontal line to YES badge */}
                  <div className="absolute left-0 top-3 w-4 h-px bg-blue-300" />
                  <Badge className="bg-blue-600 hover:bg-blue-700 relative z-10">YES</Badge>
                </div>
                <div className="flex-1 space-y-6">
                  {yesPath}
                </div>
              </div>
            </div>
          )}

          {noPath && (
            <div className="relative mt-6">
              {/* Vertical line from question to NO branch */}
              <div className="absolute left-4 top-0 w-px h-6 bg-gray-300" />
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-20 relative">
                  {/* Horizontal line to NO badge */}
                  <div className="absolute left-0 top-3 w-4 h-px bg-gray-300" />
                  <Badge variant="outline" className="border-gray-400 text-gray-700 relative z-10">NO</Badge>
                </div>
                <div className="flex-1 space-y-6">
                  {noPath}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export const DecisionTree = () => {
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const toggleNode = (nodeId: string) => {
    setExpandedNodes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nodeId)) {
        newSet.delete(nodeId);
      } else {
        newSet.add(nodeId);
      }
      return newSet;
    });
  };

  const handleStartOver = () => {
    setExpandedNodes(new Set(['root']));
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-3xl mb-3 text-gray-900">Email Sending Strategy Decision Tree</h1>
            <p className="text-gray-600">Follow this guide to determine the best approach for your email migration</p>
          </div>
          <Button 
            onClick={handleStartOver}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Start Over
          </Button>
        </div>
      </div>

      <DecisionNode
        nodeId="root"
        question="Are you still able to send emails from your previous platform?"
        expandedNodes={expandedNodes}
        onToggle={toggleNode}
        yesPath={
          <DecisionNode
            nodeId="yes-regular"
            question="Have you been sending regularly from your domain within the last 30 days?"
            level={1}
            expandedNodes={expandedNodes}
            onToggle={toggleNode}
            yesPath={
              <ResultNode
                nodeId="cumulative"
                method="Use the Cumulative Method"
                subtitle='"Two Bucket System"'
                description="This keeps your sending behavior consistent while gradually introducing Kit's infrastructure."
                level={2}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
              />
            }
            noPath={
              <ResultNode
                nodeId="additive-paused"
                method="Use the Additive Method"
                subtitle='"Exponential Ramp-Up"'
                description="If sending has been paused for a while, inbox providers may treat the domain like a new sender."
                level={2}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
              />
            }
          />
        }
        noPath={
          <DecisionNode
            nodeId="no-new-domain"
            question="Are you sending from a new domain or introducing your domain for the first time?"
            level={1}
            expandedNodes={expandedNodes}
            onToggle={toggleNode}
            yesPath={
              <ResultNode
                nodeId="additive-new"
                method="Use the Additive Method"
                subtitle='"Exponential Ramp-Up"'
                description="This helps build domain reputation gradually."
                level={2}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
              />
            }
            noPath={
              <ResultNode
                nodeId="additive-unavailable"
                method="Use the Additive Method"
                subtitle='"Exponential Ramp-Up"'
                description="If the previous platform is unavailable, ramping up directly within Kit is the safest approach."
                level={2}
                expandedNodes={expandedNodes}
                onToggle={toggleNode}
              />
            }
          />
        }
      />
    </div>
  );
};