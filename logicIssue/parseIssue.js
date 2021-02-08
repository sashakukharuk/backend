const {filter, gradation} = require("./FilterGradationData")
const differentDate = require("../middleware/differentDate")
const {createLevelsArray, createPositionsPoint} = require("./CreateArrayPositions")

module.exports = function ParseIssue() {
    this.data = null
    this.priority = []
    this.status = []
    this.issuetype = []
    this.assignee = []

    this.parse = (data) => {
        this.data = data

        this.pushToItem()

        this.status = filter(this.status)
        this.priority = filter(this.priority)
        this.issuetype = filter(this.issuetype)
        this.assignee = filter(this.assignee)

        this.status = gradation(['To Do', 'In Progress', 'In Review', 'Done'], this.status)
        this.priority = gradation(['Highest', 'High', 'Medium', 'Low', 'Lowest'], this.priority)
        this.issuetype = gradation(['Bug', 'Task', 'Improvement', 'New Feature'], this.issuetype)

        this.positionY = createPositionsPoint(this.issuetype)
        this.positionX = createPositionsPoint(this.priority)

        this.setArraySchemaIssues()
        this.filterIssues()

        return {
            status: this.status,
            assignee: this.assignee,
            priority: this.priority,
            issuetype: this.issuetype
        }
    }

    this.pushToItem = () => {
        this.data.issues.forEach(issue => {
            this.priority.push(issue.fields.priority)
            this.status.push(issue.fields.status)
            this.issuetype.push(issue.fields.issuetype)
            this.assignee.push({
                name: issue.fields.assignee ? issue.fields.assignee.displayName : 'Assignee',
                issues: []
            })
        })
    }

    this.setArraySchemaIssues = () => {
        this.assignee.forEach(item => {
            item.issues = createLevelsArray(this.issuetype, this.priority)
        })
    }

    this.filterIssues = () => {
        this.data.issues.forEach(issue => {
            console.log(issue.fields.assignee.displayName)
            this.assignee.forEach(item => {
                const displayName = issue.fields.assignee ? issue.fields.assignee.displayName : 'Assignee'
                if (item.name === displayName) {
                    item.issues[this.positionY[issue.fields.issuetype.name]][this.positionX[issue.fields.priority.name]].push({
                        position: `${this.positionY[issue.fields.issuetype.name]},${this.positionX[issue.fields.priority.name]}`,
                        status: issue.fields.status.name,
                        link: `https://myfirtssite.atlassian.net/issues/?jql=assignee%20in%20(${issue.fields.assignee ? issue.fields.assignee.accountId : 'EMPTY'})%20AND%20issuetype%20%3D%20"${issue.fields.issuetype.name}"%20AND%20status%20%3D%20"${issue.fields.status.name}"%20AND%20priority%20%3D%20${issue.fields.priority.name}`,
                        differentCreated: differentDate(issue.fields.created),
                        differentDue: differentDate(issue.fields.duedate)
                    })
                }
            })
        })
    }
}
